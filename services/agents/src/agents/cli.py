"""CLI do pipeline multiagente."""

import argparse
import json
import sys

from dotenv import load_dotenv

load_dotenv()


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Pipeline multiagente Evangelho Digital (Groq + LangGraph)"
    )
    sub = parser.add_subparsers(dest="command", required=True)

    run_parser = sub.add_parser("run", help="Executar pipeline completo")
    run_parser.add_argument("--tema", default="")
    run_parser.add_argument("--publico", default="")
    run_parser.add_argument("--objetivo", default="")
    run_parser.add_argument(
        "--pilar",
        default="familia",
        choices=["fe", "ciencia", "tecnologia", "familia", "educacao", "criacao"],
    )
    run_parser.add_argument("--output", help="Arquivo JSON de saída")
    run_parser.add_argument("--dry-run", action="store_true", help="Validar config sem chamar API")

    args = parser.parse_args()

    if args.command == "run":
        if args.dry_run:
            from agents.config import settings
            from agents.memory import load_institutional_memory

            print("Config OK")
            print(f"  Modelo: {settings.groq_model}")
            print(f"  Memória: {settings.memory_dir} ({len(load_institutional_memory())} chars)")
            print(f"  Groq key: {'sim' if settings.groq_api_key else 'NÃO — configure .env'}")
            sys.exit(0 if settings.groq_api_key else 1)

        if not args.tema or not args.publico or not args.objetivo:
            print("Erro: --tema, --publico e --objetivo são obrigatórios.")
            sys.exit(1)

        from agents.graph import run_pipeline

        print("Iniciando pipeline (7 agentes + governança)...")
        state = run_pipeline(
            tema=args.tema,
            publico_alvo=args.publico,
            objetivo=args.objetivo,
            pilar=args.pilar,
        )

        summary = {
            "blocked": state.blocked,
            "block_reason": state.block_reason,
            "ethics_approved": state.ethics_approved,
            "governance_approved": state.governance_approved,
            "science_confidence": state.science_confidence,
            "audit_stages": [a.stage for a in state.audit_trail],
            "multichannel_keys": list(state.multichannel.keys()),
            "written_preview": state.written_content[:800] if state.written_content else "",
        }

        if args.output:
            out_path = args.output
            payload = state.model_dump()
            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(payload, f, ensure_ascii=False, indent=2, default=str)
            print(f"Resultado salvo em {out_path}")

        print(json.dumps(summary, ensure_ascii=False, indent=2))

        if state.blocked:
            print("\n❌ Pipeline bloqueado:", state.block_reason[:300])
            sys.exit(1)
        print("\n✅ Pipeline concluído — pronto para publicação após revisão humana.")
        sys.exit(0)


if __name__ == "__main__":
    main()

import json
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "data"

def load(name):
    with (BASE / name).open(encoding="utf-8") as f:
        return json.load(f)

axes = load("axes.json")
questions = load("questions.json")
distros = load("distros.json")
levels = load("complexity-levels.json")

axis_ids = {axis["id"] for axis in axes["axes"]}
level_ids = {level["id"] for level in levels["levels"]}

assert len(questions["likert_questions"]) == 50, "Devem existir exatamente 50 afirmações."
assert len(questions["hardware_questions"]) <= 10, "Devem existir no máximo 10 perguntas de hardware."

question_ids = [q["id"] for q in questions["likert_questions"]]
assert len(question_ids) == len(set(question_ids)), "IDs de perguntas Likert duplicados."

for question in questions["likert_questions"]:
    unknown_axes = set(question["weights"]) - axis_ids
    assert not unknown_axes, f"Pergunta {question['id']} usa eixos desconhecidos: {unknown_axes}"
    assert question["weights"], f"Pergunta {question['id']} está sem pesos."

distro_ids = [d["id"] for d in distros["distros"]]
assert len(distro_ids) == len(set(distro_ids)), "IDs de distros duplicados."

hardware_dimensions = {d["id"] for d in distros["hardware_dimensions"]}

for distro in distros["distros"]:
    assert distro["complexity_level"] in level_ids, f"Nível inválido em {distro['id']}"
    assert set(distro["profile"]) == axis_ids, f"Perfil incompleto em {distro['id']}"
    assert set(distro["hardware"]) == hardware_dimensions, f"Hardware incompleto em {distro['id']}"
    for group in ("profile", "hardware"):
        for key, value in distro[group].items():
            assert 0 <= value <= 100, f"{distro['id']}.{group}.{key} fora de 0..100"

for question in questions["hardware_questions"]:
    needs = question.get("on_yes", {}).get("needs", {})
    unknown_needs = set(needs) - hardware_dimensions
    assert not unknown_needs, f"{question['id']} usa necessidades desconhecidas: {unknown_needs}"

print("Validação concluída com sucesso.")
print(f"Eixos: {len(axis_ids)}")
print(f"Afirmações Likert: {len(questions['likert_questions'])}")
print(f"Perguntas de hardware: {len(questions['hardware_questions'])}")
print(f"Combinações de distro + desktop: {len(distros['distros'])}")
print(f"Níveis de complexidade: {len(level_ids)}")

from pathlib import Path

ROOT = Path(".")

files = [
    "src/app/page.tsx",
    "src/app/exam/[id]/page.tsx",
    "src/app/subject/[id]/page.tsx",

    "src/components/ExamCard.tsx",
    "src/components/SubjectCard.tsx",
    "src/components/TopicCard.tsx",
    "src/components/ProgressBar.tsx",
    "src/components/AddExamModal.tsx",
    "src/components/AddSubjectModal.tsx",
    "src/components/AddTopicModal.tsx",

    "src/types/exam.ts",

    "src/hooks/useExamStore.ts",

    "src/utils/progress.ts",
    "src/utils/date.ts",

    "src/store/examStore.ts",
]

for file in files:
    path = ROOT / file
    path.parent.mkdir(parents=True, exist_ok=True)

    if not path.exists():
        path.write_text("", encoding="utf-8")
        print(f"Created: {file}")
    else:
        print(f"Already exists: {file}")

print("\nProject structure created successfully.")
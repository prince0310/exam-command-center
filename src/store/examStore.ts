import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Exam } from "@/types/exam";

interface ExamStore {
    exams: Exam[];

    addExam: (name: string) => void;
    deleteExam: (examId: string) => void;

    addSubject: (
        examId: string,
        name: string,
        deadline?: string
    ) => void;

    deleteSubject: (
        examId: string,
        subjectId: string
    ) => void;

    addTopic: (
        examId: string,
        subjectId: string,
        name: string,
        description?: string,
        deadline?: string
    ) => void;

    deleteTopic: (
        examId: string,
        subjectId: string,
        topicId: string
    ) => void;

    toggleTopic: (
        examId: string,
        subjectId: string,
        topicId: string
    ) => void;
}

export const useExamStore = create<ExamStore>()(
    persist(
        (set) => ({
            exams: [],

            // =========================
            // EXAM
            // =========================

            addExam: (name) =>
                set((state) => ({
                    exams: [
                        ...state.exams,
                        {
                            id: crypto.randomUUID(),
                            name: name.trim(),
                            subjects: [],
                        },
                    ],
                })),

            deleteExam: (examId) =>
                set((state) => ({
                    exams: state.exams.filter(
                        (exam) => exam.id !== examId
                    ),
                })),

            // =========================
            // SUBJECT
            // =========================

            addSubject: (
                examId,
                name,
                deadline
            ) =>
                set((state) => ({
                    exams: state.exams.map((exam) =>
                        exam.id === examId
                            ? {
                                ...exam,
                                subjects: [
                                    ...exam.subjects,
                                    {
                                        id: crypto.randomUUID(),
                                        name: name.trim(),
                                        deadline,
                                        topics: [],
                                    },
                                ],
                            }
                            : exam
                    ),
                })),

            deleteSubject: (
                examId,
                subjectId
            ) =>
                set((state) => ({
                    exams: state.exams.map((exam) =>
                        exam.id === examId
                            ? {
                                ...exam,
                                subjects:
                                    exam.subjects.filter(
                                        (subject) =>
                                            subject.id !== subjectId
                                    ),
                            }
                            : exam
                    ),
                })),

            // =========================
            // TOPIC
            // =========================

            addTopic: (
                examId,
                subjectId,
                name,
                description,
                deadline
            ) =>
                set((state) => ({
                    exams: state.exams.map((exam) =>
                        exam.id === examId
                            ? {
                                ...exam,
                                subjects:
                                    exam.subjects.map(
                                        (subject) =>
                                            subject.id === subjectId
                                                ? {
                                                    ...subject,
                                                    topics: [
                                                        ...subject.topics,
                                                        {
                                                            id: crypto.randomUUID(),
                                                            name: name.trim(),
                                                            description:
                                                                description?.trim(),
                                                            deadline,
                                                            completed: false,
                                                        },
                                                    ],
                                                }
                                                : subject
                                    ),
                            }
                            : exam
                    ),
                })),

            deleteTopic: (
                examId,
                subjectId,
                topicId
            ) =>
                set((state) => ({
                    exams: state.exams.map((exam) =>
                        exam.id === examId
                            ? {
                                ...exam,
                                subjects:
                                    exam.subjects.map(
                                        (subject) =>
                                            subject.id === subjectId
                                                ? {
                                                    ...subject,
                                                    topics:
                                                        subject.topics.filter(
                                                            (topic) =>
                                                                topic.id !==
                                                                topicId
                                                        ),
                                                }
                                                : subject
                                    ),
                            }
                            : exam
                    ),
                })),

            // =========================
            // COMPLETION
            // =========================

            toggleTopic: (
                examId,
                subjectId,
                topicId
            ) =>
                set((state) => ({
                    exams: state.exams.map((exam) =>
                        exam.id === examId
                            ? {
                                ...exam,
                                subjects:
                                    exam.subjects.map(
                                        (subject) =>
                                            subject.id === subjectId
                                                ? {
                                                    ...subject,
                                                    topics:
                                                        subject.topics.map(
                                                            (topic) =>
                                                                topic.id ===
                                                                    topicId
                                                                    ? {
                                                                        ...topic,
                                                                        completed:
                                                                            !topic.completed,
                                                                    }
                                                                    : topic
                                                        ),
                                                }
                                                : subject
                                    ),
                            }
                            : exam
                    ),
                })),
        }),
        {
            name: "exam-command-center",
        }
    )
);
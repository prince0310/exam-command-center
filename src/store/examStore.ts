import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Exam } from "@/types/exam";

interface ExamStore {
    exams: Exam[];
    loading: boolean;

    loadExams: () => Promise<void>;

    addExam: (name: string) => Promise<void>;
    deleteExam: (examId: string) => Promise<void>;

    addSubject: (
        examId: string,
        name: string,
        deadline?: string
    ) => Promise<void>;

    deleteSubject: (
        examId: string,
        subjectId: string
    ) => Promise<void>;

    addTopic: (
        examId: string,
        subjectId: string,
        name: string,
        description?: string,
        deadline?: string
    ) => Promise<void>;

    deleteTopic: (
        examId: string,
        subjectId: string,
        topicId: string
    ) => Promise<void>;

    toggleTopic: (
        examId: string,
        subjectId: string,
        topicId: string
    ) => Promise<void>;
}

export const useExamStore = create<ExamStore>((set, get) => ({
    exams: [],
    loading: false,

    // ==========================================
    // LOAD EXAMS
    // ==========================================

    loadExams: async () => {
        set({ loading: true });

        const { data, error } = await supabase
            .from("exams")
            .select(`
        id,
        name,
        subjects (
          id,
          name,
          deadline,
          topics (
            id,
            name,
            description,
            deadline,
            completed
          )
        )
      `)
            .order("created_at", {
                ascending: true,
            });

        if (error) {
            console.error("Error loading exams:", error);
            set({ loading: false });
            return;
        }

        const exams: Exam[] = (data ?? []).map((exam) => ({
            id: exam.id,
            name: exam.name,
            subjects: (exam.subjects ?? []).map(
                (subject) => ({
                    id: subject.id,
                    name: subject.name,
                    deadline: subject.deadline ?? undefined,
                    topics: (subject.topics ?? []).map(
                        (topic) => ({
                            id: topic.id,
                            name: topic.name,
                            description:
                                topic.description ?? undefined,
                            deadline:
                                topic.deadline ?? undefined,
                            completed: topic.completed,
                        })
                    ),
                })
            ),
        }));

        set({
            exams,
            loading: false,
        });
    },

    // ==========================================
    // ADD EXAM
    // ==========================================

    addExam: async (name) => {
        const trimmedName = name.trim();

        if (!trimmedName) return;

        const id = crypto.randomUUID();

        const { error } = await supabase
            .from("exams")
            .insert({
                id,
                name: trimmedName,
            });

        if (error) {
            console.error("Error adding exam:", error);
            return;
        }

        await get().loadExams();
    },

    // ==========================================
    // DELETE EXAM
    // ==========================================

    deleteExam: async (examId) => {
        const { error } = await supabase
            .from("exams")
            .delete()
            .eq("id", examId);

        if (error) {
            console.error(
                "Error deleting exam:",
                error
            );
            return;
        }

        set((state) => ({
            exams: state.exams.filter(
                (exam) => exam.id !== examId
            ),
        }));
    },

    // ==========================================
    // ADD SUBJECT
    // ==========================================

    addSubject: async (
        examId,
        name,
        deadline
    ) => {
        const trimmedName = name.trim();

        if (!trimmedName) return;

        const { error } = await supabase
            .from("subjects")
            .insert({
                id: crypto.randomUUID(),
                exam_id: examId,
                name: trimmedName,
                deadline: deadline || null,
            });

        if (error) {
            console.error(
                "Error adding subject:",
                error
            );
            return;
        }

        await get().loadExams();
    },

    // ==========================================
    // DELETE SUBJECT
    // ==========================================

    deleteSubject: async (
        examId,
        subjectId
    ) => {
        const { error } = await supabase
            .from("subjects")
            .delete()
            .eq("id", subjectId)
            .eq("exam_id", examId);

        if (error) {
            console.error(
                "Error deleting subject:",
                error
            );
            return;
        }

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
        }));
    },

    // ==========================================
    // ADD TOPIC
    // ==========================================

    addTopic: async (
        examId,
        subjectId,
        name,
        description,
        deadline
    ) => {
        const trimmedName = name.trim();

        if (!trimmedName) return;

        const { error } = await supabase
            .from("topics")
            .insert({
                id: crypto.randomUUID(),
                subject_id: subjectId,
                name: trimmedName,
                description:
                    description?.trim() || null,
                deadline: deadline || null,
                completed: false,
            });

        if (error) {
            console.error(
                "Error adding topic:",
                error
            );
            return;
        }

        await get().loadExams();
    },

    // ==========================================
    // DELETE TOPIC
    // ==========================================

    deleteTopic: async (
        examId,
        subjectId,
        topicId
    ) => {
        const { error } = await supabase
            .from("topics")
            .delete()
            .eq("id", topicId)
            .eq("subject_id", subjectId);

        if (error) {
            console.error(
                "Error deleting topic:",
                error
            );
            return;
        }

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
        }));
    },

    // ==========================================
    // TOGGLE TOPIC
    // ==========================================

    toggleTopic: async (
        examId,
        subjectId,
        topicId
    ) => {
        const state = get();

        const exam = state.exams.find(
            (exam) => exam.id === examId
        );

        const subject = exam?.subjects.find(
            (subject) =>
                subject.id === subjectId
        );

        const topic = subject?.topics.find(
            (topic) => topic.id === topicId
        );

        if (!topic) return;

        const newCompleted =
            !topic.completed;

        const { error } = await supabase
            .from("topics")
            .update({
                completed: newCompleted,
            })
            .eq("id", topicId)
            .eq("subject_id", subjectId);

        if (error) {
            console.error(
                "Error updating topic:",
                error
            );
            return;
        }

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
                                                                    newCompleted,
                                                            }
                                                            : topic
                                                ),
                                        }
                                        : subject
                            ),
                    }
                    : exam
            ),
        }));
    },
}));
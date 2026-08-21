import { Exam, Subject } from "@/types/exam";

export function getTopicCount(subject: Subject) {
    return subject.topics.length;
}

export function getCompletedTopicCount(subject: Subject) {
    return subject.topics.filter(
        (topic) => topic.completed
    ).length;
}

export function getSubjectProgress(subject: Subject) {
    if (subject.topics.length === 0) {
        return 0;
    }

    return Math.round(
        (getCompletedTopicCount(subject) /
            subject.topics.length) *
        100
    );
}

export function isSubjectCompleted(subject: Subject) {
    return (
        subject.topics.length > 0 &&
        subject.topics.every(
            (topic) => topic.completed
        )
    );
}

export function getCompletedSubjectCount(exam: Exam) {
    return exam.subjects.filter(
        (subject) => isSubjectCompleted(subject)
    ).length;
}

export function getExamProgress(exam: Exam) {
    if (exam.subjects.length === 0) {
        return 0;
    }

    return Math.round(
        (getCompletedSubjectCount(exam) /
            exam.subjects.length) *
        100
    );
}

export function isExamCompleted(exam: Exam) {
    return (
        exam.subjects.length > 0 &&
        exam.subjects.every((subject) =>
            isSubjectCompleted(subject)
        )
    );
}
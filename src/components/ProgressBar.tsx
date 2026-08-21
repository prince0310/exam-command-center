interface ProgressBarProps {
    progress: number;
}

export default function ProgressBar({
    progress,
}: ProgressBarProps) {
    const safeProgress = Math.min(
        100,
        Math.max(0, progress)
    );

    return (
        <div className="w-full">
            <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500">
                    Progress
                </span>

                <span
                    className={`font-bold ${safeProgress === 100
                            ? "text-emerald-600"
                            : "text-violet-600"
                        }`}
                >
                    {safeProgress}%
                </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${safeProgress === 100
                            ? "bg-linear-to-r from-emerald-400 to-green-500"
                            : "bg-linear-to-r from-violet-500 via-indigo-500 to-blue-500"
                        }`}
                    style={{
                        width: `${safeProgress}%`,
                    }}
                />
            </div>
        </div>
    );
}
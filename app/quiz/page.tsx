import QuizWizard from "@/components/QuizWizard";

export const metadata = {
  title: "שאלון המלצות — myVienna",
};

export default function QuizPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-stone-900">✨ שאלון המלצות</h1>
        <p className="mt-1 text-stone-500">
          ארבע שאלות קצרות — ונתאים לכם את האטרקציות המושלמות לטיול שלכם
        </p>
      </div>
      <QuizWizard />
    </div>
  );
}

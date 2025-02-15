import Board from "@/components/common/board";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
          칸반 보드
        </h1>
      </header>
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex gap-4 sm:gap-6 pb-6 flex-wrap">
          <Board />
        </div>
      </section>
    </main>
  );
}

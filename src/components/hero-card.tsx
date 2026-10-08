import Hero from "../assets/barbershop-hero.png";

export function HeroCard() {
  return (
    <section className="relative mb-8 min-h-70 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 sm:min-h-85">
      <img
        src={Hero}
        alt="Interior sofisticado da BARBER&CO."
        className="absolute inset-0 size-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/20" />
      <div className="relative flex min-h-70 max-w-xl flex-col justify-center gap-5 p-6 sm:min-h-85 sm:p-10">
        <p className="text-xs font-medium tracking-[0.24em] text-zinc-400 uppercase">
          BARBER&CO. · AGENDAMENTO PREMIUM
        </p>
        <h1 className="font-serif text-4xl leading-[0.95] tracking-tight text-zinc-50 sm:text-6xl">
          Seu próximo corte começa aqui.
        </h1>
        <p className="max-w-md text-sm leading-6 text-zinc-300 sm:text-base">
          Profissionais experientes, ambiente exclusivo e um horário reservado
          para você.
        </p>
        <a
          href="/reservar"
          className="w-fit rounded-md bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
        >
          Agendar agora
        </a>
      </div>
    </section>
  );
}

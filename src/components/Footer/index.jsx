export function Footer() {
  return (
    <footer className="mt-5 font-sans text-shadow-title w-full flex flex-col items-center justify-center drop-shadow-sm text-xs">
      <span>
        Feito para{" "}
        <a
          className="underline decoration-yellow-400 underline-offset-2"
          href="https://innovaconnect.com.br/"
          target="_blank"
        >
          Innova Connect Sistemas
        </a>
      </span>
      <span>
        Criado por{" "}
        <a
          className="underline decoration-yellow-400 underline-offset-2"
          href="https://github.com/geovane-gc"
          target="_blank"
        >
          Geovane
        </a>
      </span>
    </footer>
  );
}

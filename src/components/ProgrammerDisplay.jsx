const ProgrammerDisplay = () => {
  const { hex, dec, oct, bin } = useCalculatorStore(state => state.getFormats());
  
  return (
    <div className="flex flex-col gap-1 p-4 bg-transparent text-sm">
      <div className="flex justify-between hover:bg-white/10 p-1 cursor-pointer">
        <span className="opacity-60">HEX</span> <span>{hex}</span>
      </div>
      <div className="flex justify-between hover:bg-white/10 p-1 cursor-pointer border-l-2 border-blue-500">
        <span className="opacity-60 font-bold">DEC</span> <span>{dec}</span>
      </div>
      <div className="flex justify-between hover:bg-white/10 p-1 cursor-pointer">
        <span className="opacity-60">OCT</span> <span>{oct}</span>
      </div>
      <div className="flex justify-between hover:bg-white/10 p-1 cursor-pointer">
        <span className="opacity-60">BIN</span> <span className="font-mono text-xs">{bin}</span>
      </div>
    </div>
  );
};
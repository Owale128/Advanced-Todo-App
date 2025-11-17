const Header = () => {
  const today = new Date();
  const month = today.toLocaleDateString('sv-SE', { month: 'long' });
  const date = today.toLocaleDateString('sv-SE', { day: 'numeric', month: 'numeric', year: 'numeric' });

  return (
    <div className="text-center border-b-2 border-gray-800 pb-6">
      <h1 className="text-5xl tracking-widest mb-12 font-(family-name:--font-playfair) uppercase">
        to do list
      </h1>
      <div className="flex justify-between text-sm text-gray-600 uppercase tracking-wider">
        <div>
          <span className="font-semibold">Månad: </span>
          <span>{month}</span>
        </div>
        <div>
          <span className="font-semibold">Datum: </span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

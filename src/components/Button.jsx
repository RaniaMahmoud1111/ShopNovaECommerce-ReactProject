export default function Button({ id, type = 'button', children, onClick, variant = 'primary', fullWidth = true }) {
  const base = `${fullWidth ? 'w-full' : ''} py-3.5 rounded-custom font-bold text-sm tracking-wide
    active:scale-95 transition-all duration-200 cursor-pointer shadow-custom`;

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl',
    secondary: 'bg-surface border-2 border-primary text-primary hover:bg-background',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

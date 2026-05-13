export default function Input({ id, name, type = 'text', placeholder, value, onChange, error, icon }) {
  return (
    <div>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-custom border text-text-primary 
            placeholder-gray-300 text-sm outline-none transition-all
            ${error
              ? 'border-danger-custom bg-red-50 focus:ring-2 focus:ring-red-200'
              : 'border-border-custom bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10'
            }`}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

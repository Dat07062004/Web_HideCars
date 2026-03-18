export default function Alert({ type = 'info', message, onClose }) {
  const bgColor = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    info: 'bg-blue-100',
    warning: 'bg-yellow-100',
  }[type];

  const textColor = {
    success: 'text-green-700',
    error: 'text-red-700',
    info: 'text-blue-700',
    warning: 'text-yellow-700',
  }[type];

  return (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded relative mb-4`}>
      {message}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-3 font-bold text-lg"
        >
          ×
        </button>
      )}
    </div>
  );
}

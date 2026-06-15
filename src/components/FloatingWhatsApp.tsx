import { motion } from "motion/react";

interface FloatingWhatsAppProps {
  onChat: () => void;
}

export default function FloatingWhatsApp({ onChat }: FloatingWhatsAppProps) {
  return (
    <motion.button
      onClick={onChat}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping:10 }}
      className="fixed bottom-3 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-1.5 rounded-full shadow-2.5xl flex items-center justify-center cursor-pointer border-2 border-white focus:outline-none"
      title="Direct Urgent WhatsApp Delivery Chat Support"
    >
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z" />
      </svg>
    </motion.button>
  );
}

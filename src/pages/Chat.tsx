/**
 * Chat Page
 * Dedicated page for the AI chatbot interface
 */

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { ChatInterface } from '../components/chat';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../utils/animations';

const TITLE = 'AI Assistant';
const WELCOME_MESSAGE =
  "Hi! I'm Subbiah's AI assistant. Ask me about his experience, skills, projects, or anything tech-related!";

/**
 * Chat page component - Full-page chatbot interface
 */
const Chat = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  // Disable animations if user prefers reduced motion
  const animation = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true },
      };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <motion.div className="mb-6 text-center" {...animation} variants={fadeInUp}>
          <div className="mb-3 flex items-center justify-center gap-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Chat with AI</h1>
          </div>
          <p className="text-muted-foreground">
            Have a conversation about my portfolio, experience, and expertise
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          className="h-[calc(100vh-16rem)]"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ChatInterface title={TITLE} welcomeMessage={WELCOME_MESSAGE} className="shadow-xl" />
        </motion.div>

        {/* Info Footer */}
        <motion.div
          className="mt-6 text-center text-xs text-muted-foreground"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            Powered by Claude AI • Responses are generated in real-time • This is a demo portfolio
            chatbot
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;

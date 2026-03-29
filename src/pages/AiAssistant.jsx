import { useState, useRef, useEffect } from 'react'
import { AlertCircle, Lightbulb, TrendingUp, Target, Tags, Sparkles, ArrowUp } from 'lucide-react'

export default function AiAssistant() {
  const [messages, setMessages] = useState('')
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom of chat if new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <div className="flex flex-col min-h-[calc(100dvh-100px)] relative">
      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-6 pt-2 pb-32">
        
        {/* Recent Insights Section */}
        <section>
          <h2 className="text-sm font-semibold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Последние инсайты</h2>
          <div className="flex flex-col gap-3">
            
            {/* Spending Alert Card */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex gap-3 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-orange-900">Внимание к расходам</h3>
                <p className="text-sm text-orange-800 leading-relaxed">Ваши расходы в кафе выросли на 40% по сравнению с прошлым месяцем. Подумайте об установке недельного лимита.</p>
                <button className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center mt-1 self-start active:scale-95 transition-transform">
                  Установить лимит на кафе &rarr;
                </button>
              </div>
            </div>

            {/* Unused Subscription Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3 shadow-sm relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
              <div className="flex-shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-blue-900">Неактивная подписка</h3>
                <p className="text-sm text-blue-800 leading-relaxed">Подписка Netflix (5 500 ₸/мес) — не использовалась 45 дней. Отмените, чтобы сэкономить 66 000 ₸/год.</p>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center mt-1 self-start active:scale-95 transition-transform">
                  Настройки подписки &rarr;
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* AI Chat Bubble */}
        <div className="mt-2 bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm p-4 text-slate-700 leading-relaxed text-[15px]">
          Привет! Я твой ИИ финансовый компаньон. Я могу помочь проанализировать траты, оптимизировать бюджеты, категоризовать операции и улучшить твою стратегию накоплений. Что бы ты хотел узнать?
        </div>

        {/* Quick Actions Section */}
        <section className="mt-2">
          <h2 className="text-sm font-semibold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Быстрые действия</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 active:scale-95 transition-all outline-none">
              <TrendingUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700 text-left">Анализ трат</span>
            </button>
            <button className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 active:scale-95 transition-all outline-none">
              <Target className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700 text-left">Оптимизация бюджета</span>
            </button>
            <button className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 active:scale-95 transition-all outline-none">
              <Tags className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700 text-left">Категоризация операций</span>
            </button>
             <button className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 active:scale-95 transition-all outline-none">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700 text-left">Советы по кэшбэку</span>
            </button>
          </div>
        </section>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (Fixed at bottom) */}
      <div 
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pt-3 bg-white border-t border-slate-200 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]"
        style={{ 
          paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))'
        }}
      >
        <div className="relative flex items-center w-full bg-slate-100 rounded-3xl p-1.5 transition-all focus-within:ring-2 focus-within:ring-[#009C4D]/30 text-slate-700">
          <input 
            type="text" 
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            placeholder="Спросить ИИ-Ассистента..." 
            className="flex-1 bg-transparent px-4 py-2.5 outline-none font-medium placeholder:text-slate-500 overflow-hidden"
          />
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 mt-auto ${
              messages.trim().length > 0 ? 'bg-[#009C4D] text-white shadow-sm active:scale-95 transform' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            disabled={!messages.trim()}
          >
            <ArrowUp className="w-5 h-5" strokeWidth={messages.trim().length > 0 ? 2.5 : 2} />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-slate-400 w-full font-medium opacity-80">
          ИИ может допускать ошибки. Проверяйте финансовую информацию.
        </p>
      </div>
    </div>
  )
}

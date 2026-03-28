import { useState } from 'react'
import { Wallet, Users, LayoutDashboard, Accessibility } from 'lucide-react'

export default function Settings() {
  const [roundUp, setRoundUp] = useState(false)
  const [approval, setApproval] = useState(true)
  const [seniorMode, setSeniorMode] = useState(false)
  const [limit, setLimit] = useState(50)

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Smart Savings Section */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Умные накопления</h2>
        <div className="bg-white rounded-2xl border border-[#009C4D]/20 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#009C4D]/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#009C4D]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-lg">Округление трат</span>
                <span className="text-sm text-slate-500">Автоматически откладывать остаток</span>
              </div>
            </div>
            
            <button 
              onClick={() => setRoundUp(!roundUp)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${roundUp ? 'bg-[#009C4D]' : 'bg-slate-200'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${roundUp ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Family Controls Section */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Семейный контроль</h2>
        <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-4 shadow-sm flex flex-col gap-5">
          {/* Header info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg">Детский счет</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-sm text-blue-600 font-medium">Привязан и активен</span>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-700">Дневной лимит трат</span>
              <span className="text-blue-600 text-base">${limit}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="200" 
              step="10" 
              value={limit} 
              onChange={(e) => setLimit(e.target.value)}
              className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="h-px bg-blue-100 w-full" />

          {/* Transaction Approval */}
          <div className="flex items-center justify-between">
             <div className="flex flex-col">
              <span className="font-bold text-slate-900">Подтверждение операций</span>
              <span className="text-sm text-slate-500">Требовать подтверждение для покупок</span>
            </div>
            <button 
              onClick={() => setApproval(!approval)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out flex-shrink-0 ${approval ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${approval ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Action Button */}
           <button className="mt-2 w-full py-3 rounded-xl bg-blue-100/50 text-blue-700 font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Управление детским счетом
          </button>
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Специальные возможности</h2>
        <div className="bg-purple-50/50 rounded-2xl border border-purple-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Accessibility className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-lg">Режим для пожилых</span>
                <span className="text-sm text-slate-500 leading-tight mt-0.5">Упрощенный контрастный интерфейс</span>
              </div>
            </div>
            
             <button 
              onClick={() => setSeniorMode(!seniorMode)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out flex-shrink-0 ${seniorMode ? 'bg-purple-600' : 'bg-slate-200'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${seniorMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useState } from 'react'
import { Plus, Target, TriangleAlert, Image as ImageIcon, Sparkles, RefreshCw, Wallet, Gift, Users } from 'lucide-react'
import BottomSheet from '../components/BottomSheet'

const forecast = [
	{ month: 'Апрель', expenses: 45000, savings: 15000, warn: false },
	{ month: 'Май', expenses: 42000, savings: 18000, warn: false },
	{ month: 'Август', expenses: 75000, savings: -5000, warn: true },
	{ month: 'Декабрь', expenses: 90000, savings: -10000, warn: true },
]

const wishes = [
	{ name: 'iPhone 15 Pro', current: 48000, target: 120000, color: 'bg-[#009C4D]', textColor: 'text-[#009C4D]', monthsLeft: 4 },
	{ name: 'Поездка в Дубай', current: 22500, target: 150000, color: 'bg-[#007E8B]', textColor: 'text-[#007E8B]', monthsLeft: 8 },
]

const savingsTotal = 8540
const savingsGoal = 15000
const savingsPercent = ((savingsTotal / savingsGoal) * 100).toFixed(1)
const savingsRemaining = savingsGoal - savingsTotal

const Budget = () => {
	const [isWishSheetOpen, setIsWishSheetOpen] = useState(false)
	const [selectedWish, setSelectedWish] = useState(null)
	const [isAutoSaveOn, setIsAutoSaveOn] = useState(true)
	const [autoSavePercent, setAutoSavePercent] = useState(15)
	const [roundUp, setRoundUp] = useState(false)
	const [roundStep, setRoundStep] = useState(100)
	const [isCashbackOn, setIsCashbackOn] = useState(false)
	const [isSharedGoal, setIsSharedGoal] = useState(false)

	return (
		<>
			<section className="mb-2">
				<div className="rounded-3xl p-6 shadow-lg shadow-[#009C4D]/25 bg-[linear-gradient(135deg,#009C4D_0%,#007a82_100%)] relative overflow-hidden">
					{/* Decorative background rings */}
					<div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border-[20px] border-white opacity-10 pointer-events-none" />
					<div className="absolute -right-2 top-24 w-16 h-16 rounded-full border-[10px] border-white opacity-10 pointer-events-none" />
					
					<div className="flex items-center gap-2 mb-6 relative z-10">
						<div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md">
							<Target className="h-5 w-5 text-white" />
						</div>
						<p className="text-white font-semibold tracking-wide">Общий прогресс накоплений</p>
					</div>
					<div className="flex items-end justify-between relative z-10">
						<h2 className="text-4xl font-extrabold text-white tracking-tight">
							{savingsTotal.toLocaleString('ru')} <span className="text-2xl font-bold opacity-80">сом</span>
						</h2>
						<span className="text-sm font-medium text-white/80 bg-black/10 px-3 py-1 rounded-full mb-1 border border-white/10 backdrop-blur-md">
							Цель: {savingsGoal.toLocaleString('ru')}
						</span>
					</div>
					<div className="mt-5 h-3.5 bg-black/20 rounded-full overflow-hidden relative z-10 p-0.5 border border-white/10">
						<div
							className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]"
							style={{ width: `${savingsPercent}%` }}
						/>
					</div>
					<div className="mt-3 flex justify-between items-center text-sm relative z-10">
						<span className="text-white font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-md">{savingsPercent}% собрано</span>
						<span className="text-white/80 font-medium">
							Осталось {savingsRemaining.toLocaleString('ru')} сом
						</span>
					</div>
				</div>
			</section>

			<section>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold">Мои хотелки и планы</h3>
					<button 
						onClick={() => { setSelectedWish(null); setIsWishSheetOpen(true); }}
						className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
					>
						<Plus className="h-4 w-4 text-[#009C4D]" />
					</button>
				</div>
				<div className="space-y-3">
					{wishes.map((item) => {
						const percent = ((item.current / item.target) * 100).toFixed(1)
						const remaining = item.target - item.current
						return (
							<div
								key={item.name}
								onClick={() => { setSelectedWish(item); setIsWishSheetOpen(true); }}
								className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform hover:bg-slate-50 relative overflow-hidden group"
							>
								<div className="flex items-center justify-between">
									<p className="text-base font-bold text-slate-900">{item.name}</p>
									<span className={`text-sm font-bold ${item.textColor}`}>{percent}%</span>
								</div>
								<div className="text-sm font-semibold text-slate-400">
									{item.current.toLocaleString('ru')} / {item.target.toLocaleString('ru')} сом
								</div>
								<div className="h-2.5 rounded-full bg-slate-100 overflow-hidden my-1">
									<div
										className={`h-full rounded-full transition-all ${item.color}`}
										style={{ width: `${percent}%` }}
									/>
								</div>
								<div className="flex justify-between text-xs font-semibold text-slate-500">
									<span>Осталось {remaining.toLocaleString('ru')} сом</span>
									<span>{item.monthsLeft} мес. осталось</span>
								</div>
							</div>
						)
					})}
				</div>
			</section>

			<section>
				<button 
					onClick={() => { setSelectedWish(null); setIsWishSheetOpen(true); }}
					className="w-full rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-medium text-slate-400 hover:bg-slate-50 transition-colors active:scale-95"
				>
					+ Добавить хотелку или план
				</button>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">Прогноз накоплений на год</h3>
				<div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<div className="grid grid-cols-3 px-5 py-3 border-b border-slate-100">
						<span className="text-xs font-semibold text-slate-400 uppercase">Месяц</span>
						<span className="text-xs font-semibold text-slate-400 uppercase text-center">Расходы</span>
						<span className="text-xs font-semibold text-slate-400 uppercase text-right">Накопления</span>
					</div>
					{forecast.map((row, i) => (
						<div
							key={row.month}
							className={`grid grid-cols-3 items-center px-5 py-4 ${
								i < forecast.length - 1 ? 'border-b border-slate-50' : ''
							} ${row.warn ? 'bg-amber-50/60' : ''}`}
						>
							<span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
								{row.month}
								{row.warn && <TriangleAlert className="h-4 w-4 text-amber-500" />}
							</span>
							<span className="text-sm text-slate-600 text-center">
								{row.expenses.toLocaleString('ru')} сом
							</span>
							<span
								className={`text-sm font-semibold text-right ${
									row.savings >= 0 ? 'text-green-600' : 'text-red-500'
								}`}
							>
								{row.savings > 0 ? '+' : ''}
								{row.savings.toLocaleString('ru')} сом
							</span>
						</div>
					))}
				</div>
			</section>

			<section className="rounded-2xl border-l-4 border-red-400 bg-white p-5 shadow-sm">
				<p className="text-sm text-slate-700 italic leading-relaxed">
					"В августе и декабре ожидаются повышенные расходы из-за отпуска и праздников.
					Рекомендуем начать откладывать заранее."
				</p>
			</section>

			<section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden mb-6">
				{/* Decorative background element */}
				<div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
				
				<div className="flex items-center justify-between mb-4 relative z-10">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
							<RefreshCw className={`w-5 h-5 text-[#009C4D] ${isAutoSaveOn ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
						</div>
						<h3 className="text-slate-900 font-bold text-lg">Авто-копилка</h3>
					</div>
					
					{/* Custom Toggle */}
					<div 
						onClick={() => setIsAutoSaveOn(!isAutoSaveOn)}
						className={`w-14 h-8 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${isAutoSaveOn ? 'bg-[#009C4D]' : 'bg-slate-200'}`}
					>
						<div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${isAutoSaveOn ? 'translate-x-6' : 'translate-x-0'}`} />
					</div>
				</div>
				
				<p className="text-sm text-slate-500 leading-relaxed pr-8 mb-5 relative z-10">
					Банк будет автоматически переводить выбранный процент от каждого вашего зачисления в копилку.
				</p>
				
				<div className={`transition-all duration-300 relative z-10 ${isAutoSaveOn ? 'opacity-100 h-auto' : 'opacity-40 grayscale pointer-events-none'}`}>
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm font-semibold text-slate-700">Процент удержания</span>
						<div className="bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
							<span className="text-[#009C4D] font-bold text-lg">{autoSavePercent}%</span>
						</div>
					</div>
					<input
						type="range"
						min="1"
						max="30"
						value={autoSavePercent}
						onChange={(e) => setAutoSavePercent(e.target.value)}
						className="w-full accent-[#009C4D] h-2 bg-slate-100 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#009C4D]/20 cursor-pointer"
						style={{
							background: `linear-gradient(to right, #009C4D 0%, #009C4D ${(autoSavePercent - 1) / 29 * 100}%, #f1f5f9 ${(autoSavePercent - 1) / 29 * 100}%, #f1f5f9 100%)`
						}}
					/>
					<div className="flex justify-between mt-3 bg-slate-50 rounded-xl p-3 border border-slate-100 items-center">
						<div className="flex flex-col">
							<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Примерный прогноз</span>
							<span className="text-sm font-bold text-slate-900 mt-0.5">В месяц накопится</span>
						</div>
						<span className="font-bold text-[#009C4D]">
							~ {(autoSavePercent * 850).toLocaleString('ru')} сом
						</span>
					</div>
				</div>
			</section>

			{/* Smart Savings Section */}
			<section className="mb-6">
				<h2 className="text-sm font-semibold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Умные накопления (Сдача)</h2>
				<div className="bg-white rounded-2xl border border-[#009C4D]/20 p-4 shadow-sm flex flex-col transition-all duration-300">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
							<div className="w-12 h-12 rounded-full bg-[#009C4D]/10 flex items-center justify-center shrink-0">
								<Wallet className="w-6 h-6 text-[#009C4D]" />
							</div>
							<div className="flex flex-col min-w-0 flex-1">
								<span className="font-bold text-slate-900 text-lg truncate">Округление трат</span>
								<span className="text-sm text-slate-500 leading-tight block">Автоматически откладывать остаток</span>
							</div>
						</div>

						<button
							onClick={() => setRoundUp(!roundUp)}
							className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out flex-shrink-0 ${roundUp ? 'bg-[#009C4D]' : 'bg-slate-200'}`}
						>
							<div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${roundUp ? 'translate-x-6' : 'translate-x-0'}`} />
						</button>
					</div>

					{roundUp && (
						<div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
							<span className="text-sm font-semibold text-slate-700">Шаг округления:</span>
							<div className="flex gap-2">
								{[10, 50, 100].map(step => (
									<button
										key={step}
										onClick={() => setRoundStep(step)}
										className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${roundStep === step
												? 'bg-[#009C4D] text-white shadow-md shadow-[#009C4D]/20'
												: 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
											}`}
									>
										до {step} ⊆
									</button>
								))}
							</div>
							<div className="bg-[#009C4D]/5 rounded-xl p-3 border border-[#009C4D]/10 mt-1">
								<p className="text-xs text-slate-600 leading-relaxed font-medium">
									{roundStep === 10 && 'Например: покупка на 127 сом округляется до 130. Разница (3 сома) автоматически переводится в вашу копилку.'}
									{roundStep === 50 && 'Например: покупка на 127 сом округляется до 150. Разница (23 сома) автоматически переводится в вашу копилку.'}
									{roundStep === 100 && 'Например: покупка на 127 сом округляется до 200. Разница (73 сома) автоматически переводится в вашу копилку.'}
								</p>
							</div>
						</div>
					)}
				</div>

				<div className="bg-white rounded-2xl border border-[#009C4D]/20 p-4 shadow-sm flex flex-col transition-all duration-300 mt-4">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
							<div className="w-12 h-12 rounded-full bg-[#009C4D]/10 flex items-center justify-center shrink-0">
								<Gift className="w-6 h-6 text-[#009C4D]" />
							</div>
							<div className="flex flex-col min-w-0 flex-1">
								<span className="font-bold text-slate-900 text-lg truncate">Кэшбэк на цель</span>
								<span className="text-sm text-slate-500 leading-tight block">Переводить кэшбэк в копилку</span>
							</div>
						</div>

						<button
							onClick={() => setIsCashbackOn(!isCashbackOn)}
							className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out flex-shrink-0 ${isCashbackOn ? 'bg-[#009C4D]' : 'bg-slate-200'}`}
						>
							<div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${isCashbackOn ? 'translate-x-6' : 'translate-x-0'}`} />
						</button>
					</div>
					{isCashbackOn && (
						<div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
							<div className="bg-[#009C4D]/5 rounded-xl p-3 border border-[#009C4D]/10">
								<p className="text-xs text-slate-600 leading-relaxed font-medium">
									Весь заработанный за месяц кэшбэк будет автоматически зачисляться на ваш счет «Общий прогресс накоплений», чтобы вы быстрее достигали своих целей.
								</p>
							</div>
						</div>
					)}
				</div>
			</section>

			<BottomSheet 
				isOpen={isWishSheetOpen} 
				onClose={() => setIsWishSheetOpen(false)} 
				title={selectedWish ? 'Редактировать хотелку' : 'Новая хотелка'}
			>
				<div className="flex flex-col gap-5">
					<div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
						<div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
							<ImageIcon className="w-6 h-6" />
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-bold text-slate-700">Иконка</span>
							<span className="text-xs text-slate-500 mt-0.5">Выберите изображение или цвет для вашей цели</span>
						</div>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-semibold text-slate-500 ml-1">На что копим?</label>
						<input 
							type="text" 
							placeholder="Например: Новый ноутбук" 
							defaultValue={selectedWish ? selectedWish.name : ''}
							className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium outline-none focus:ring-1 ring-[#009C4D] transition-all" 
						/>
					</div>

					<div className="flex flex-col gap-1.5 relative">
						<label className="text-sm font-semibold text-slate-500 ml-1">Целевая сумма</label>
						<input 
							type="number" 
							placeholder="Например: 120 000" 
							defaultValue={selectedWish ? selectedWish.target : ''}
							className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold outline-none focus:ring-1 ring-[#009C4D] transition-all text-lg" 
						/>
						<span className="absolute right-4 top-[38px] text-slate-400 font-medium">сом</span>
					</div>

					<div className="flex flex-col gap-2 mt-1">
						<label className="text-sm font-semibold text-slate-500 ml-1">Первоначальный взнос (свободных средств: 8,540 сом)</label>
						<div className="flex gap-2">
							<button className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200">+ 1 000</button>
							<button className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200">+ 5 000</button>
							<button className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200">Всё</button>
						</div>
					</div>

					<div className="flex items-center gap-3 mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
						<button
							onClick={() => setIsSharedGoal(!isSharedGoal)}
							className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out flex-shrink-0 ${isSharedGoal ? 'bg-[#009C4D]' : 'bg-slate-300'}`}
						>
							<div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${isSharedGoal ? 'translate-x-5' : 'translate-x-0'}`} />
						</button>
						<div className="flex flex-col">
							<span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
								<Users className="w-4 h-4 text-[#009C4D]" /> Совместная цель
							</span>
							<span className="text-xs text-slate-500 font-medium">Копите вместе по ссылке</span>
						</div>
					</div>

					<button 
						onClick={() => setIsWishSheetOpen(false)}
						className="w-full mt-2 py-4 rounded-xl bg-[#009C4D] text-white font-bold text-base hover:bg-emerald-600 transition-colors active:scale-95 shadow-md shadow-[#009C4D]/20"
					>
						{selectedWish ? 'Сохранить изменения' : 'Создать хотелку'}
					</button>
				</div>
			</BottomSheet>
		</>
	)
}

export default Budget

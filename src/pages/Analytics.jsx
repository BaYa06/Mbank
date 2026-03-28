import { useState } from 'react'
import { Pencil, Plus, TrendingUp, AlertTriangle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomSheet from '../components/BottomSheet'

const subscriptions = [
	{ id: 1, name: 'Netflix', price: 5500, cycle: 'мес', icon: '🎬', color: 'bg-red-50 border-red-100', iconBg: 'bg-red-100', active: false, lastUsed: '45 дней назад', nextDate: '5 апр', category: 'Развлечения', aiWarning: true },
	{ id: 2, name: 'Spotify', price: 1500, cycle: 'мес', icon: '🎵', color: 'bg-emerald-50 border-emerald-100', iconBg: 'bg-emerald-100', active: true, lastUsed: 'Сегодня', nextDate: '12 апр', category: 'Музыка', aiWarning: false },
	{ id: 3, name: 'iCloud', price: 1200, cycle: 'мес', icon: '☁️', color: 'bg-blue-50 border-blue-100', iconBg: 'bg-blue-100', active: true, lastUsed: 'Вчера', nextDate: '1 апр', category: 'Хранилище', aiWarning: false },
	{ id: 4, name: 'ChatGPT Plus', price: 8900, cycle: 'мес', icon: '🤖', color: 'bg-violet-50 border-violet-100', iconBg: 'bg-violet-100', active: true, lastUsed: '3 дня назад', nextDate: '22 апр', category: 'ИИ', aiWarning: false },
]

const daysData = [
	{ day: 'Пн', height: 'h-16', amount: 1250 },
	{ day: 'Вт', height: 'h-24', amount: 3400 },
	{ day: 'Ср', height: 'h-12', amount: 800 },
	{ day: 'Чт', height: 'h-28', amount: 5600 },
	{ day: 'Пт', height: 'h-20', amount: 2100 },
	{ day: 'Сб', height: 'h-14', amount: 1050 },
	{ day: 'Вс', height: 'h-[4.5rem]', amount: 850 },
]

const categoryMockData = {
	week: [
		{ name: 'Еда', value: 45.5, color: 'bg-emerald-500', hex: '#10b981' },
		{ name: 'Транспорт', value: 20.0, color: 'bg-blue-500', hex: '#3b82f6' },
		{ name: 'Развлечения', value: 15.0, color: 'bg-amber-500', hex: '#f59e0b' },
		{ name: 'Продукты', value: 10.5, color: 'bg-violet-500', hex: '#8b5cf6' },
		{ name: 'Прочее', value: 9.0, color: 'bg-gray-400', hex: '#9ca3af' },
	],
	month: [
		{ name: 'Еда', value: 21.6, color: 'bg-emerald-500', hex: '#10b981' },
		{ name: 'Продукты', value: 17.1, color: 'bg-violet-500', hex: '#8b5cf6' },
		{ name: 'Коммунальные', value: 16.2, color: 'bg-cyan-500', hex: '#06b6d4' },
		{ name: 'Прочее', value: 15.9, color: 'bg-gray-400', hex: '#9ca3af' },
		{ name: 'Транспорт', value: 13.3, color: 'bg-blue-500', hex: '#3b82f6' },
		{ name: 'Развлечения', value: 10.2, color: 'bg-amber-500', hex: '#f59e0b' },
		{ name: 'Медицина', value: 5.7, color: 'bg-red-500', hex: '#ef4444' },
	],
	'3months': [
		{ name: 'Еда', value: 25.0, color: 'bg-emerald-500', hex: '#10b981' },
		{ name: 'Продукты', value: 20.0, color: 'bg-violet-500', hex: '#8b5cf6' },
		{ name: 'Транспорт', value: 15.0, color: 'bg-blue-500', hex: '#3b82f6' },
		{ name: 'Одежда', value: 12.0, color: 'bg-pink-500', hex: '#ec4899' },
		{ name: 'Коммунальные', value: 10.0, color: 'bg-cyan-500', hex: '#06b6d4' },
		{ name: 'Медицина', value: 8.0, color: 'bg-red-500', hex: '#ef4444' },
		{ name: 'Прочее', value: 10.0, color: 'bg-gray-400', hex: '#9ca3af' },
	]
}

const Analytics = () => {
	const navigate = useNavigate()
	const [isLimitSheetOpen, setIsLimitSheetOpen] = useState(false)
	const [selectedLimitCategory, setSelectedLimitCategory] = useState('')
	const [selectedDay, setSelectedDay] = useState(daysData[3]) // Четверг
	const [period, setPeriod] = useState('week')
	const [selectedSub, setSelectedSub] = useState(null)
	const [isSubSheetOpen, setIsSubSheetOpen] = useState(false)

	const handleCategoryClick = (name) => {
		let mapped = 'Другое'
		if (name === 'Еда' || name === 'Продукты') mapped = 'Еда'
		else if (name === 'Транспорт') mapped = 'Транспорт'
		else if (name === 'Коммунальные') mapped = 'Счета'
		navigate(`/transactions?category=${encodeURIComponent(mapped)}`)
	}

	return (
		<>
			{/* Period Tabs */}
			<section className="flex p-1 bg-slate-100 rounded-full">
				{[
					{ key: 'week', label: 'Неделя' },
					{ key: 'month', label: 'Месяц' },
					{ key: '3months', label: '3 месяца' },
				].map(tab => (
					<button 
						key={tab.key}
						onClick={() => setPeriod(tab.key)}
						className={`flex-1 py-2 text-sm transition-colors duration-300 rounded-full ${
							period === tab.key ? 'font-semibold bg-[#009e4f] text-white shadow-sm' : 'font-medium text-slate-500 hover:text-slate-800'
						}`}
					>
						{tab.label}
					</button>
				))}
			</section>

			{/* AI Summary */}
			<section 
				onClick={() => navigate('/ai-assistant')}
				className="rounded-2xl p-5 bg-[linear-gradient(135deg,#FFF100_0%,#FABF00_100%)] shadow-md relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
			>
				<div className="relative z-10 flex gap-4">
					<div className="text-3xl">🤖</div>
					<div>
						<h3 className="font-bold text-slate-900 mb-1">ИИ-Сводка</h3>
						<p className="text-sm text-slate-800 leading-relaxed font-medium">
							В этом месяце вы потратили на 12% меньше, чем в прошлом. Отличный результат!
						</p>
					</div>
				</div>
				<div className="absolute -right-4 -bottom-4 opacity-10">
					<span className="material-symbols-outlined text-8xl">smart_toy</span>
				</div>
			</section>

			{/* Expenses by Day */}
			<section>
				<div className="flex items-end justify-between mb-4">
					<h2 className="text-lg font-bold flex items-center gap-2">
						<span className="material-symbols-outlined text-[#009e4f]">bar_chart</span>
						Расходы
					</h2>
					<div className="flex flex-col items-end">
						<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{selectedDay.day}</span>
						<span className="text-base font-bold text-slate-900 leading-none">{selectedDay.amount.toLocaleString('ru')} сом</span>
					</div>
				</div>
				<div className="bg-white p-5 pt-8 rounded-2xl border border-slate-100 shadow-sm relative">
					<div className="flex items-end justify-between h-36 px-2 relative">
						{/* Background horizontal lines to make it look like a real chart */}
						<div className="absolute inset-x-2 inset-y-0 pb-6 flex flex-col justify-between pointer-events-none opacity-50 z-0">
							<div className="w-full h-px bg-slate-200"></div>
							<div className="w-full h-px bg-slate-200"></div>
							<div className="w-full h-px bg-slate-200"></div>
						</div>
						
						{daysData.map((d) => {
							const isActive = selectedDay.day === d.day
							return (
								<div key={d.day} className="flex flex-col items-center gap-2 group relative z-10 w-8 cursor-pointer mt-auto" onClick={() => setSelectedDay(d)}>
									{/* Tooltip on hover */}
									<div className={`absolute whitespace-nowrap bg-slate-800 text-white text-[10px] items-center justify-center font-bold px-2 py-1 rounded-md transition-all duration-300 hidden group-hover:flex z-20 ${isActive ? '!opacity-100 -top-10' : 'opacity-0 -top-6'}`}>
										{d.amount}
										<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-800" />
									</div>

									<div
										className={`w-full rounded-t-md ${d.height} transition-all duration-300 origin-bottom ${
											isActive
												? 'bg-[linear-gradient(180deg,#007E8B_0%,#009C4D_100%)] shadow-md shadow-[#009C4D]/30 scale-y-105'
												: 'bg-slate-200 group-hover:bg-slate-300'
										}`}
									/>
									<span
										className={`text-xs mt-1 transition-colors ${
											isActive ? 'font-bold text-[#007e8b]' : 'font-medium text-slate-400 group-hover:text-slate-600'
										}`}
									>
										{d.day}
									</span>
								</div>
							)
						})}
					</div>
				</div>
			</section>
			{/* Spending by Category - Donut Chart */}
			<section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
				<h2 className="text-lg font-bold mb-5">Расходы по категориям</h2>
				<div className="flex items-center gap-5">
					{/* Donut */}
					<div className="relative shrink-0">
						<svg width="120" height="120" viewBox="0 0 120 120">
							<circle cx="60" cy="60" r="48" fill="none" stroke="#e2e8f0" strokeWidth="18" />
							{categoryMockData[period].reduce((acc, cat) => {
								const strokeDasharray = `${(cat.value / 100) * 301.6} 301.6`
								const strokeDashoffset = `${-acc.offset * 301.6}`
								
								acc.elements.push(
									<circle 
										key={cat.name}
										cx="60" cy="60" r="48" 
										fill="none" 
										stroke={cat.hex} 
										strokeWidth="18"
										strokeDasharray={strokeDasharray}
										strokeDashoffset={strokeDashoffset}
										transform="rotate(-90 60 60)"
										className="transition-all duration-700 ease-out"
									/>
								)
								acc.offset += (cat.value / 100)
								return acc
							}, { offset: 0, elements: [] }).elements}
						</svg>
					</div>
					{/* Legend */}
					<div className="flex-1 space-y-2">
						{categoryMockData[period].map((cat) => (
							<div 
								key={cat.name} 
								onClick={() => handleCategoryClick(cat.name)}
								className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors active:scale-95"
							>
								<div className="flex items-center gap-2">
									<div className={`w-2.5 h-2.5 rounded-full ${cat.color} transition-colors duration-500`} />
									<span className="text-xs text-slate-700">{cat.name}</span>
								</div>
								<span className="text-xs font-semibold text-slate-900 transition-all duration-500">{cat.value}%</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Limits Section */}
			<section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mt-5">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-bold">Лимиты категорий</h2>
					<button 
						onClick={() => { setSelectedLimitCategory('Новая категория'); setIsLimitSheetOpen(true); }}
						className="text-xs font-semibold text-[#009C4D] bg-[#009C4D]/10 px-3 py-1.5 rounded-full hover:bg-[#009C4D]/20 transition-colors active:scale-95"
					>
						+ Добавить
					</button>
				</div>
				<div className="flex flex-col gap-5">
					{[
						{ name: 'Еда и продукты', spent: 22000, limit: 25000, color: 'bg-emerald-500' },
						{ name: 'Транспорт', spent: 8500, limit: 10000, color: 'bg-blue-500' },
						{ name: 'Развлечения', spent: 12000, limit: null, color: 'bg-amber-500' }
					].map((item) => {
						if (item.limit) {
							const percent = Math.min(100, Math.round((item.spent / item.limit) * 100))
							const isNearLimit = percent >= 90
							const barColor = isNearLimit ? 'bg-red-500' : item.color
							
							return (
								<div key={item.name} className="flex flex-col gap-2">
									<div className="flex items-center justify-between">
										<span className="text-sm font-semibold text-slate-800">{item.name}</span>
										<div className="flex items-center gap-2">
											<span className="text-xs font-medium text-slate-500">
												<span className={isNearLimit ? 'text-red-500 font-bold' : 'text-slate-900 font-semibold'}>{item.spent.toLocaleString('ru')}</span> / {item.limit.toLocaleString('ru')} сом
											</span>
											<button 
												onClick={() => { setSelectedLimitCategory(item.name); setIsLimitSheetOpen(true); }}
												className="p-1 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors active:scale-95"
											>
												<Pencil className="w-3.5 h-3.5" />
											</button>
										</div>
									</div>
									<div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
										<div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${percent}%` }} />
									</div>
								</div>
							)
						} else {
							return (
								<div key={item.name} className="flex flex-col gap-2">
									<div className="flex items-center justify-between">
										<span className="text-sm font-semibold text-slate-800">{item.name}</span>
										<button 
											onClick={() => { setSelectedLimitCategory(item.name); setIsLimitSheetOpen(true); }}
											className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-50 py-1 px-3 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors border border-dashed border-slate-200 active:scale-95"
										>
											<Plus className="w-3.5 h-3.5" />
											Установить лимит
										</button>
									</div>
									<div className="h-2 w-full bg-slate-50 border border-dashed border-slate-200 rounded-full flex-shrink-0" />
								</div>
							)
						}
					})}
				</div>
			</section>

			{/* ── Subscriptions Section ── */}
			<section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className="text-lg font-bold">Подписки</h2>
						<p className="text-xs text-slate-400 font-medium mt-0.5">
							{subscriptions.reduce((s, i) => s + i.price, 0).toLocaleString('ru')} сом/мес · {subscriptions.length} подписки
						</p>
					</div>
					{subscriptions.some(s => s.aiWarning) && (
						<div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-1.5 rounded-full">
							<AlertTriangle className="w-3.5 h-3.5" />
							Есть неактивные
						</div>
					)}
				</div>

				<div className="flex flex-col gap-3">
					{subscriptions.map(sub => (
						<div
							key={sub.id}
							onClick={() => { setSelectedSub(sub); setIsSubSheetOpen(true) }}
							className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer active:scale-95 transition-transform ${sub.color} ${sub.aiWarning ? 'ring-1 ring-amber-300' : ''}`}
						>
							<div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${sub.iconBg}`}>
								{sub.icon}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-1.5">
									<p className="text-sm font-bold text-slate-900">{sub.name}</p>
									{sub.aiWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
								</div>
								<p className="text-xs text-slate-500 font-medium">
									{sub.active ? `Следующий платёж: ${sub.nextDate}` : `Неактивна · ${sub.lastUsed}`}
								</p>
							</div>
							<div className="flex flex-col items-end shrink-0">
								<span className="text-sm font-bold text-slate-900">{sub.price.toLocaleString('ru')} сом</span>
								{sub.active
									? <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-0.5"><CheckCircle2 className="w-3 h-3" />Активна</span>
									: <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mt-0.5"><XCircle className="w-3 h-3" />Неактивна</span>
								}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Subscription Detail Sheet */}
			{selectedSub && (
				<BottomSheet
					isOpen={isSubSheetOpen}
					onClose={() => setIsSubSheetOpen(false)}
					title={selectedSub.name}
				>
					<div className="flex flex-col gap-5">
						{/* Header */}
						<div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
							<div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0 ${selectedSub.iconBg}`}>
								{selectedSub.icon}
							</div>
							<div>
								<p className="text-2xl font-extrabold text-slate-900">{selectedSub.price.toLocaleString('ru')} <span className="text-base font-semibold text-slate-400">сом/{selectedSub.cycle}</span></p>
								<p className="text-sm text-slate-500 font-medium mt-0.5">{selectedSub.category}</p>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
								<p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Последнее использование</p>
								<p className="text-sm font-bold text-slate-900 mt-1">{selectedSub.lastUsed}</p>
							</div>
							<div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
								<p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Следующий платёж</p>
								<p className="text-sm font-bold text-slate-900 mt-1">{selectedSub.nextDate}</p>
							</div>
							<div className="bg-slate-50 rounded-xl p-3 border border-slate-100 col-span-2">
								<p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Стоимость в год</p>
								<p className="text-sm font-bold text-slate-900 mt-1">{(selectedSub.price * 12).toLocaleString('ru')} сом</p>
							</div>
						</div>

						{/* AI Warning */}
						{selectedSub.aiWarning && (
							<div className="bg-amber-50 rounded-xl p-4 flex gap-3 border border-amber-200">
								<AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
								<div>
									<p className="text-sm font-bold text-amber-900">ИИ рекомендует отменить</p>
									<p className="text-xs text-amber-800 leading-relaxed mt-0.5">Подписка не использовалась {selectedSub.lastUsed}. Отменив её, вы сэкономите <b>{(selectedSub.price * 12).toLocaleString('ru')} сом/год</b>.</p>
								</div>
							</div>
						)}

						{/* Actions */}
						<button
							onClick={() => setIsSubSheetOpen(false)}
							className="w-full py-4 rounded-xl bg-red-500 text-white font-bold text-base hover:bg-red-600 transition-colors active:scale-95 shadow-lg shadow-red-500/20"
						>
							Отменить подписку
						</button>
						<button
							onClick={() => setIsSubSheetOpen(false)}
							className="w-full py-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-base hover:bg-slate-200 transition-colors active:scale-95 -mt-2"
						>
							Оставить подписку
						</button>
					</div>
				</BottomSheet>
			)}

			{/* Limit Edit Bottom Sheet */}
			<BottomSheet 
				isOpen={isLimitSheetOpen} 
				onClose={() => setIsLimitSheetOpen(false)} 
				title={selectedLimitCategory === 'Новая категория' ? 'Новый лимит' : 'Изменить лимит'}
			>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-semibold text-slate-500 ml-1">Категория</label>
						<select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium outline-none appearance-none">
							<option>{selectedLimitCategory !== 'Новая категория' ? selectedLimitCategory : 'Выберите категорию...'}</option>
							<option>Еда и продукты</option>
							<option>Транспорт</option>
							<option>Развлечения</option>
						</select>
					</div>
					<div className="flex flex-col gap-1.5 relative">
						<label className="text-sm font-semibold text-slate-500 ml-1">Лимит (сом/мес)</label>
						<input 
							type="number" 
							placeholder="Например: 15000" 
							className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold outline-none focus:ring-1 ring-emerald-500 transition-all text-lg" 
						/>
						<span className="absolute right-4 top-[38px] text-slate-400 font-medium">сом</span>
					</div>
					
					<div className="mt-2 bg-emerald-50 rounded-xl p-4 flex gap-3 border border-emerald-100">
						<TrendingUp className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
						<div className="flex flex-col">
							<span className="text-sm font-bold text-emerald-900">ИИ Рекомендует</span>
							<span className="text-xs text-emerald-800 leading-relaxed mt-0.5 hover:underline cursor-pointer">
								Установить лимит 12,000 сом на основе ваших трат в прошлом месяце.
							</span>
						</div>
					</div>

					<button 
						onClick={() => setIsLimitSheetOpen(false)}
						className="w-full mt-2 py-4 rounded-xl bg-[#009e4f] text-white font-bold text-base hover:bg-emerald-600 transition-colors active:scale-95 shadow-md shadow-emerald-500/20"
					>
						Сохранить изменения
					</button>
				</div>
			</BottomSheet>
		</>
	)
}

export default Analytics

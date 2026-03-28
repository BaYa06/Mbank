import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, ChevronUp, ChevronDown, QrCode } from 'lucide-react'
import BottomSheet from '../components/BottomSheet'

const categories = ['Все', 'Еда', 'Транспорт', 'Покупки', 'Счета', 'Зарплата', 'Другое']

const transactions = [
	{
		date: 'Сегодня',
		items: [
			{ name: 'Кофейня Арт', category: 'еда', desc: 'Утренний кофе', time: '10:30', amount: -380 },
			{ name: 'Фрунзе Маркет', category: 'еда', desc: 'Продукты на неделю', time: '09:15', amount: -1240 },
		],
	},
	{
		date: 'Вчера',
		items: [
			{ name: 'Зарплата', category: 'зарплата', desc: 'Основной доход', time: '18:00', amount: 85000 },
			{ name: 'Яндекс Go', category: 'транспорт', desc: 'Поездка до работы', time: '08:45', amount: -450 },
			{ name: 'Glovo', category: 'еда', desc: 'Доставка обеда', time: '13:20', amount: -620 },
		],
	},
	{
		date: '26 марта',
		items: [
			{ name: 'Netflix', category: 'счета', desc: 'Ежемесячная подписка', time: '00:00', amount: -890 },
			{ name: 'OZON', category: 'покупки', desc: 'Наушники', time: '15:30', amount: -3200 },
		],
	},
]

const totalIncome = transactions.flatMap((g) => g.items).filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0)
const totalExpenses = transactions.flatMap((g) => g.items).filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)

const categoryColors = {
	еда: 'bg-orange-500',
	транспорт: 'bg-blue-500',
	покупки: 'bg-purple-500',
	счета: 'bg-slate-500',
	зарплата: 'bg-green-500',
	другое: 'bg-gray-500',
}

const Transactions = () => {
	const [searchParams] = useSearchParams()
	const initialCategory = searchParams.get('category') || 'Все'

	const [typeFilter, setTypeFilter] = useState('all')
	const [showFilters, setShowFilters] = useState(initialCategory !== 'Все')
	const [categoryFilter, setCategoryFilter] = useState(initialCategory)
	const [isSplitSheetOpen, setIsSplitSheetOpen] = useState(false)
	const [selectedTxForSplit, setSelectedTxForSplit] = useState(null)
	const [splitCount, setSplitCount] = useState(2)

	return (
		<div className="flex flex-col min-h-[calc(100vh-140px)]">
			<div className="flex-1 space-y-4">
				<div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3 mt-2">
					<Search className="h-5 w-5 text-slate-400" />
					<input
						type="text"
						placeholder="Поиск по названию или описанию..."
						className="bg-transparent text-sm flex-1 outline-none placeholder:text-slate-400"
					/>
				</div>

				<div className="flex gap-2">
					{[
						{ key: 'all', label: 'Все' },
						{ key: 'income', label: 'Доходы' },
						{ key: 'expense', label: 'Расходы' },
					].map((tab) => (
						<button
							key={tab.key}
							onClick={() => setTypeFilter(tab.key)}
							className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
								typeFilter === tab.key
									? 'bg-blue-600 text-white'
									: 'bg-slate-100 text-slate-600'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				<div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<button
						onClick={() => setShowFilters(!showFilters)}
						className="w-full flex items-center justify-between px-5 py-4"
					>
						<div className="flex items-center gap-2">
							<Filter className="h-5 w-5 text-blue-600" />
							<span className="font-semibold text-slate-900">Расширенные фильтры</span>
						</div>
						{showFilters ? (
							<ChevronUp className="h-5 w-5 text-slate-400" />
						) : (
							<ChevronDown className="h-5 w-5 text-slate-400" />
						)}
					</button>
					{showFilters && (
						<div className="px-5 pb-4 pt-1 border-t border-slate-100">
							<p className="text-sm text-slate-500 mb-3">Категория</p>
							<div className="flex flex-wrap gap-2">
								{categories.map((cat) => (
									<button
										key={cat}
										onClick={() => setCategoryFilter(cat)}
										className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
											categoryFilter === cat
												? 'bg-blue-600 text-white'
												: 'bg-slate-100 text-slate-600'
										}`}
									>
										{cat}
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="space-y-5">
					{transactions.map((group) => {
						const filteredItems = group.items.filter((tx) => {
							if (typeFilter === 'income' && tx.amount < 0) return false
							if (typeFilter === 'expense' && tx.amount >= 0) return false
							if (categoryFilter !== 'Все' && tx.category.toLowerCase() !== categoryFilter.toLowerCase()) return false
							return true
						})

						if (filteredItems.length === 0) return null

						return (
							<div key={group.date}>
								<p className="text-sm font-semibold text-slate-400 mb-3">{group.date}</p>
								<div className="space-y-3">
									{filteredItems.map((tx, i) => (
										<div
											key={i}
											onClick={() => {
												if (tx.amount < 0) {
													setSelectedTxForSplit(tx)
													setSplitCount(2)
													setIsSplitSheetOpen(true)
												}
											}}
											className={`bg-white rounded-2xl p-4 border border-slate-100 shadow-sm transition-transform ${tx.amount < 0 ? 'cursor-pointer active:scale-95 hover:bg-slate-50 relative overflow-hidden group' : ''}`}
										>
											<div className="flex items-start justify-between mb-1">
												<div className="flex items-center gap-2">
													<p className="text-base font-semibold text-slate-900">{tx.name}</p>
													<span
														className={`px-2 py-0.5 rounded-md text-[11px] font-semibold text-white ${
															categoryColors[tx.category] || 'bg-gray-500'
														}`}
													>
														{tx.category}
													</span>
												</div>
												<span
													className={`text-base font-bold ${
														tx.amount >= 0 ? 'text-green-500' : 'text-slate-900'
													}`}
												>
													{tx.amount >= 0 ? '+' : ''}
													{tx.amount.toLocaleString('ru')} сом
												</span>
											</div>
											<p className="text-sm text-slate-400">{tx.desc}</p>
											<div className="flex items-center justify-between mt-1">
												<p className="text-xs text-slate-300">{tx.time}</p>
												{tx.amount < 0 && (
													<span className="text-xs font-semibold text-[#009C4D] bg-[#009C4D]/10 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
														Разделить чек
													</span>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						)
					})}
				</div>
			</div>

			<div className="sticky bottom-0 bg-white border-t border-slate-100 -mx-4 px-4 py-3 mt-6 flex justify-between items-end">
				<div>
					<p className="text-xs text-slate-400">Общий доход</p>
					<p className="text-lg font-bold text-green-500">
						{totalIncome.toLocaleString('ru')} сом
					</p>
				</div>
				<div className="text-right">
					<p className="text-xs text-slate-400">Общие расходы</p>
					<p className="text-lg font-bold text-slate-900">
						{totalExpenses.toLocaleString('ru')} сом
					</p>
				</div>
			</div>

			{/* Split Receipt Sheet */}
			<BottomSheet
				isOpen={isSplitSheetOpen}
				onClose={() => setIsSplitSheetOpen(false)}
				title="Разделить счет"
			>
				{selectedTxForSplit && (
					<div className="flex flex-col gap-4">
						<div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
							<div className="flex flex-col">
								<span className="text-sm font-bold text-slate-900">{selectedTxForSplit.name}</span>
								<span className="text-xs text-slate-500 mt-0.5">{selectedTxForSplit.desc}</span>
							</div>
							<span className="text-lg font-black text-slate-900">{Math.abs(selectedTxForSplit.amount).toLocaleString('ru')} сом</span>
						</div>

						<div className="bg-[#009C4D]/5 p-5 rounded-3xl border border-[#009C4D]/20 flex flex-col items-center gap-3 relative">
							<div className="w-40 h-40 bg-white rounded-2xl border-2 border-dashed border-[#009C4D] flex items-center justify-center relative overflow-hidden">
								<div className="w-full h-full bg-[#009C4D]/10" />
								<QrCode className="absolute w-12 h-12 text-[#009C4D] bg-white rounded-xl p-1" />
							</div>
							<p className="text-sm font-semibold text-[#009C4D] text-center max-w-[200px]">
								Покажите этот QR-код друзьям для оплаты
							</p>
						</div>

						<div className="flex flex-col gap-1.5 mt-2">
							<label className="text-sm font-semibold text-slate-500 ml-1">На сколько человек делим?</label>
							<div className="flex bg-slate-100 rounded-xl p-1">
								{[2, 3, 4, 5].map(num => (
									<button 
										key={num} 
										onClick={() => setSplitCount(num)}
										className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
											splitCount === num ? 'bg-white text-[#009C4D] shadow-sm' : 'text-slate-600 hover:bg-slate-200'
										}`}
									>
										{num}
									</button>
								))}
							</div>
							<p className="text-xs text-slate-400 text-center mt-2">
								Каждый скинется по <span className="font-bold text-slate-700">{Math.round(Math.abs(selectedTxForSplit.amount) / splitCount).toLocaleString('ru')} сом</span>
							</p>
						</div>

						<button 
							onClick={() => setIsSplitSheetOpen(false)}
							className="w-full mt-2 py-4 rounded-xl bg-slate-900 text-white font-bold text-base hover:bg-slate-800 transition-colors active:scale-95 shadow-md flex justify-center items-center gap-2"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
							Поделиться ссылкой
						</button>
					</div>
				)}
			</BottomSheet>
		</div>
	)
}

export default Transactions

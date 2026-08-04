function FeatureCard ({title,discripion}){
  return(
    <div className = "border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h3 className = "text-lg font-bold text-blue-900 mb-2">{title}</h3>
      <p className = "text-gray-600">{discription}</p>
  </div>
  )
}
export default FeatureCard;
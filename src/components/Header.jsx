function Header() {
  return (
<header dir ="rtl" className = "flex justify-between items-center px-10 py-5 bg-white">
<h1 className = "text-2xl font-bold text-blue-900">PS ACADEMY</h1>      
      <nav className="flex gap-6">
        <a href="#" className="text-gray-700 hover:text-blue-900">الرئيسية</a>
        <a href="#" className="text-gray-700 hover:text-blue-900">لماذا نحن</a>
        <a href="#" className="text-gray-700 hover:text-blue-900">من نحن</a>
        <a href="#" className="text-gray-700 hover:text-blue-900">تواصل معنا</a>
      </nav>

      <div className="flex gap-3">
        <button className="px-4 py-2 border border-blue-900 text-blue-900 rounded">دخول</button>
        <button className="px-4 py-2 bg-blue-900 text-white rounded">سجل الآن</button>
      </div>
    </header>
  );
}

export default Header;
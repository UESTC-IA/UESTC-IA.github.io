document.addEventListener("DOMContentLoaded", function() {
    // 1. 注入导航栏 (Navbar)
    const navbarHTML = `
    <nav class="fixed w-full z-50 top-0 transition-all duration-300 glass-effect">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <a href="index.html" class="flex-shrink-0 flex items-center gap-3 group">
                    <div class="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-cyan-600/20 group-hover:scale-110 transition-transform">IA</div>
                    <span class="font-bold text-lg tracking-tight text-slate-800">UESTC <span class="text-cyan-600">IA</span></span>
                </a>
                <div class="hidden md:flex space-x-8 items-center">
                    <a href="index.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">首页</a>
                    <a href="partners.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">团队与合作</a>
                    <a href="research.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">核心方向</a>
                    <a href="events.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">活动</a>
                    <a href="projects.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">成果</a>
                    <a href="join.html" class="bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-cyan-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">加入我们</a>
                </div>
            </div>
        </div>
    </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 2. 注入页脚 (Footer)
    const footerHTML = `
    <footer class="bg-slate-900 text-slate-500 py-12 mt-20 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
                <span class="text-slate-300 font-bold tracking-wider">UESTC IA</span>
                <span class="mx-2 text-slate-700">|</span>
                <span class="text-xs">电子科技大学交叉学科协会 © 2025</span>
            </div>
            <div class="flex space-x-6 text-sm">
                <a href="#" class="hover:text-cyan-400 transition">关于我们</a>
                <a href="#" class="hover:text-cyan-400 transition">联系方式</a>
            </div>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
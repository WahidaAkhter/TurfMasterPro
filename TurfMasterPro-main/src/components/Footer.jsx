
function Footer() {
    return (
        <>
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">

                        {/* Brand / Logo */}
                        <div className="flex flex-col items-start">
                            <h1 className="text-2xl font-bold text-white">TurfMasterPro</h1>
                            <p className="mt-2 text-gray-400">Play regularly and keep yourself physically fit.</p>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col space-y-2">
                                <h3 className="text-white font-semibold">Company</h3>
                                <a href="#" className="hover:text-white transition-colors">About</a>
                                <a href="#" className="hover:text-white transition-colors">Careers</a>
                                <a href="#" className="hover:text-white transition-colors">Blog</a>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <h3 className="text-white font-semibold">Support</h3>
                                <a href="#" className="hover:text-white transition-colors">Help Center</a>
                                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <h3 className="text-white font-semibold">Contact</h3>
                                <a href="#" className="hover:text-white transition-colors">Email Us</a>
                                <a href="#" className="hover:text-white transition-colors">Support Chat</a>
                                <a href="#" className="hover:text-white transition-colors">Locations</a>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
                        © 2025 MyBrand. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
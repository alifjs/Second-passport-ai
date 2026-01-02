export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-3">About SecondPassport.ai</h3>
            <p className="text-gray-400 text-sm">
              Streamlining the university application process for students worldwide. 
              Get your offer letters faster with our automated platform.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <p className="text-gray-400 text-sm mb-2">
              Email: <a href="mailto:support@secondpassport.ai" className="text-primary-400 hover:text-primary-300">support@secondpassport.ai</a>
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Powered by <span className="font-semibold text-primary-400">SecondPassport.ai</span>
          </p>
        </div>
      </div>
    </footer>
  )
}


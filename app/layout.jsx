import { Jost } from 'next/font/google'
import Providers from '@/app/providers'
import ClientEnhancements from '@/components/ui/ClientEnhancements'
import './globals.css'

const jost = Jost({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })
export const metadata = {
    title: { default: 'VBS - Job-Ready Digital Skills', template: '%s | VBS' },
    description:
        'Practical courses, career guides and expert mentorship for students, early-career and working professionals.',
    metadataBase: new URL('http://localhost:3000'),
}
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${jost.className} antialiased relative min-h-screen`}>
                <Providers>
                    <ClientEnhancements />
                    {children}
                </Providers>
            </body>
        </html>
    )
}

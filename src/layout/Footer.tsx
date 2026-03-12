'use client'

import Link from 'next/link'
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className='border-t border-divider bg-background'>
      <MaxWidthWrapper>
        <div className='py-10 md:flex md:items-center md:justify-between'>
          <div className='flex items-center gap-2 mb-4 md:mb-0'>
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              &copy; Kurai {new Date().getFullYear()} — All Rights Reserved
            </p>
          </div>
          <div className='flex items-center gap-6'>
            <Link href='' className='text-sm text-muted-foreground hover:text-white transition-colors'>
              Terms
            </Link>
            <Link href='' className='text-sm text-muted-foreground hover:text-white transition-colors'>
              Privacy Policy
            </Link>
            <Link href='' className='text-sm text-muted-foreground hover:text-white transition-colors'>
              Cookie Policy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
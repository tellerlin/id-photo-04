"use client"

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"; // 引入 Image 组件

import logo from '../public/logo.png'; // 导入 logo 图片
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="ID Photographic Logo" width={32} height={32} />
            <span className="text-lg font-bold">ID Photographic</span>
          </Link>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2">Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
           
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const url = encodeURIComponent(window.location.href);
              const text = encodeURIComponent('Check out this awesome ID photo generator!');
              window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
            }}
          >
            Share on Twitter
          </Button>
          <Link href="/idphoto">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 shadow-md">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

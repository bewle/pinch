import { Info, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import Link from "next/link";

export default function InfoButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline">
                <Info />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>info</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <p className="text-3xl font-semibold">pinch v0.01</p>
            <AlertDialogCancel className="h-fit w-fit p-0">
              <Button className="h-fit w-fit p-1" variant="ghost" size="icon">
                <X size={16} />
              </Button>
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="prose-headings:text-primary prose-headings:mb-2 prose-p:text-primary prose">
          <h2>what?</h2>
          <p>
            pinch is a simple wallpaper cropper. it is meant to crop mobile
            wallpapers, but it can be used to crop desktop wallpapers as well.
          </p>
          <h2>why?</h2>
          <p>
            as an iphone user, i&apos;ve found that the native wallpaper cropper
            built-in doesn&apos;t suit my needs, especially in latest versions.
            after realizing there weren&apos;t many straightforward solutions
            for my problem (that i knew of), i decided to make my own solution
            how i liked it.
          </p>
          <h2>how?</h2>
          <p>
            pinch was built with <Link href="https://nextjs.org">next.js</Link>{" "}
            and <Link href="https://tailwindcss.com">tailwindcss</Link>,
            scaffolded with{" "}
            <Link href="https://create.t3.gg/">create-t3-app</Link>. it could
            not have been made without these amazing libraries:
            <ul>
              <li>
                <Link target="_blank" href="https://ui.shadcn.com">
                  shadcn/ui
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.npmjs.com/package/react-easy-crop"
                >
                  react-easy-crop
                </Link>
              </li>
            </ul>
          </p>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}

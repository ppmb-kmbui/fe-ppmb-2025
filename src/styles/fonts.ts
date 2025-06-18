import { Black_Han_Sans, Quicksand, Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

// TODO: Add CocoGoose alternative
const number = Black_Han_Sans({
    subsets: ["latin"],
    weight: '400'
});

const title = localFont({ src: "./Cocogoose-Pro-Regular-trial.ttf" })

const body = Quicksand({ subsets: ['latin'] });

const body_alternative = Montserrat({ subsets: ['latin'] });

export { number, body, body_alternative, title }
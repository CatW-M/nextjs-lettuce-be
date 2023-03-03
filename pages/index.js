import Image from 'next/image';
import Link from 'next/link';
import RootLayout from './layout';

export default function Home() {
  return (
    <RootLayout title="Home Page">
      <Link href="/product" className="rounded-md p-1 text-2xl">
        The food app for the anti-planner
      </Link>
      <main className="m-7 flex flex-col items-center justify-center">
        <br />
        <br />
        <div className="grid">
          <Image
            className="w-full mr-[5%] mb-[5%]"
            src="/front1.png"
            alt="Food"
            width={500}
            height={500}
          />
        </div>
        <div className="text-center mb-3 p-6 text-2xl">
          <h1 className="text-3xl m-2 p-1">
            Meal planning isn&apos;t for everyone. but no one likes throwing
            away expired food.
          </h1>
          <p> Lettuce help you reduce your food waste, without judgement!</p>
        </div>
        <div className="mt-3 p-6 grid grid-cols-3 text-center">
          <div>
            <Image
              className="p-4 w-[80%]"
              src="/../public/images/frontchecklist.png"
              alt="checklist"
              width={100}
              height={100}
            />
          </div>
          <div>
            <Image
              className="p-4 w-[80%]"
              src="/../public/images/frontheart.png"
              alt="heart"
              width={100}
              height={100}
            />
          </div>
          <div>
            <Image
              className="p-4 w-[80%]"
              src="/../public/images/fronttime.png"
              alt="checklist"
              width={100}
              height={100}
            />
          </div>
          <div className="trio">Input your ingredients into LettuceBe</div>
          <div className="trio">Save your frequently used items</div>
          <div className="trio">
            See when your ingredients are about to expire
          </div>
        </div>
        <div className="pt-0 pb-3 grid grid-cols-1 place-content-center w-full">
          {/* @ts-expect-error Server Component */}
          <Link href="signup">
            <button className="primary-button w-full">Sign up</button>
          </Link>
        </div>
      </main>
    </RootLayout>
  );
}

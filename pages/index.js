import Image from 'next/image';
import Link from 'next/link';
import RootLayout from './layout';

export default function Home() {
  return (
    <RootLayout title="Home Page">
      <main className="m-7 items-center">
        <Link href="/product" className="bg-tertiary rounded-md p-1">
          The food app for the anti-planner
        </Link>
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
        <div className="text-center mb-3 p-6">
          <h1>OUR MISSION</h1>
          <p>
            To make sure ingredients at home get consumed, not wasted. Lettuce
            help you reduce your food waste, without judgement!{' '}
          </p>
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
          <div>Input your ingredients into LettuceBe</div>
          <div>Save your frequently used items</div>
          <div>See when your ingredients are about to expire</div>
        </div>
        <div className="pt-0 pb-3 grid grid-cols-1 place-content-center w-full">
          {/* @ts-expect-error Server Component */}
          <button className="primary-button">{/* SignUp */}Sign up</button>
        </div>
      </main>
    </RootLayout>
  );
}

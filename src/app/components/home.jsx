import Header from "./header";
import SubHeader from "./sub-header";

export default function HomeScreen(params) {
  const first_data = [
    {
      image: "",
      title: "",
      button: "",
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
        <SubHeader />
      </div>
      <div className="mt-28">
        {/* Section 1 */}
        <section class="bg-white dark:bg-gray-900">
          <div class="py-2 mx-auto max-w-screen-xl">
            <div class="w-full">
              <img
                src="https://laser247.online/assets/img/slider1.webp"
                className="w-full flex rounded-lg"
              />
            </div>
          </div>
        </section>
        {/* Sec Section */}
        <section class="bg-white dark:bg-gray-900">
          <div class="py-2 mx-auto max-w-screen-xl">
            <div class="grid gap-2 lg:grid-cols-2">
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/banner-sport1.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Sports</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/sportbook.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Sports Book</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/aviator-banner.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Aviator</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/turboplinko.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Royal Games</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* Section three */}
        <section class="bg-white dark:bg-gray-900">
          <div class="py-2 mx-auto max-w-screen-xl">
            {/* Section */}
            <article class="rounded-lg min-h-[40vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/popular-games-banner.webp')] bg-cover bg-no-repeat">
              <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                <div class="flex items-center justify-between w-full">
                  <span class="font-medium text-white">Royal Games</span>
                  <button className="btn btn-sm">Play Now</button>
                </div>
              </div>
            </article>
          </div>
        </section>
        {/* Section Four */}
        <section class="bg-white dark:bg-gray-900">
          <div class="py-2 mx-auto max-w-screen-xl">
            <div class="grid gap-2 lg:grid-cols-4">
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/banner-sport1.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Sports</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/sportbook.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Sports Book</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/aviator-banner.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Aviator</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/turboplinko.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Royal Games</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/banner-sport1.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Sports</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/sportbook.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Sports Book</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/aviator-banner.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Aviator</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
              <article class="rounded-lg min-h-[30vh] border border-gray-200 shadow-md flex items-end bg-[url('https://laser247.online/assets/img/turboplinko.webp')] bg-cover bg-no-repeat">
                <div class="flex justify-between items-center h-[40px] bg-gradient-to-r from-black px-2 w-full">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-medium text-white">Royal Games</span>
                    <button className="btn btn-sm">Play Now</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

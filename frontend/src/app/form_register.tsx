"use client";

export function Form({
                       onSubmit, // Change from `action` to `onSubmit`
                       children,
                     }: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}) {
  return (
      <form
          onSubmit={onSubmit} // 🔄 Use `onSubmit` instead of `action`
          className="flex flex-col space-y-4 bg-gray-50 px-4 pt-8 pb-2 sm:px-16"
      >
        <div>
          <label
              htmlFor="name"
              className="block text-xs text-gray-600 uppercase"
          >
            Name
          </label>
          <input
              id="name"
              name="name"
              type="name"
              placeholder="full name"
              //autoComplete="name"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
              htmlFor="email"
              className="block text-xs text-gray-600 uppercase"
          >
            Email Address
          </label>
          <input
              id="email"
              name="email"
              type="email"
              placeholder="user@acme.com"
              autoComplete="email"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
              htmlFor="password"
              className="block text-xs text-gray-600 uppercase"
          >
            Password
          </label>
          <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        {children}
      </form>
  );
}
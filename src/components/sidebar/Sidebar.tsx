import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="hidden md:block w-64 bg-gray-100 shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard">
              <a className="text-gray-700 hover:bg-gray-200 block px-4 py-2 rounded">
                Overview
              </a>
            </Link>
          </li>
          <li>
            <Link href="/expenses">
              <a className="text-gray-700 hover:bg-gray-200 block px-4 py-2 rounded">
                Expenses
              </a>
            </Link>
          </li>
          <li>
            <Link href="/income">
              <a className="text-gray-700 hover:bg-gray-200 block px-4 py-2 rounded">
                Income
              </a>
            </Link>
          </li>
          <li>
            <Link href="/goals">
              <a className="text-gray-700 hover:bg-gray-200 block px-4 py-2 rounded">
                Goals
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

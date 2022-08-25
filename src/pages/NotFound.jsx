import {siteName } from '../config';
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import PageNotFound from 'assets/404.jpg';
export default function NotFound(){
  useEffect(()=>{
    document.title = siteName+ " - 404"
})
    return (
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="py-12">
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div class="p-6 bg-white border-b border-white">
                <div class="max-w-md w-full space-y-8">
                  <div>
                    <img src={PageNotFound} alt="404 not found"/>
                    <p class="my-2 text-center text-lg text-gray-900">
                    The page you are trying to reach does not exist or has been removed. 
                  </p>
                  <p className="my-2 text-center text-lg text-gray-900">Please contact support if you believe this is an issue.</p>
                  </div>
                  <div>
                  <Link to="/" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go Home</Link>                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
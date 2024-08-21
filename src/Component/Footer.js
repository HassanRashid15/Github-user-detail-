import React from 'react'

function Footer() {
  return (
    <>
    <div class="bg-gray-100">
    <div class="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto footer-alignment-custom">
        <div class="p-5 footer-company-link">
            <h3 class="font-bold text-xl text-indigo-600">Company Name</h3>
        </div>
        <div class="p-5 resources-layout-custom">
            <div class="text-sm uppercase text-indigo-600 font-bold">Resources</div>
            <a class="my-3 block" href="/#">Documentation <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Tutorials <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Support</a>
        </div>
        <div class="p-5 support-custom-link">
            <div class="text-sm uppercase text-indigo-600 font-bold">Support</div>
            <a class="my-3 block" href="/#">Help Center <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Privacy Policy <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Conditions <span class="text-teal-600 text-xs p-1"></span></a>
        </div>
        <div class="p-5 contactus-layout-custom">
            <div class="text-sm uppercase text-indigo-600 font-bold">Contact us</div>
            <a class="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA
                <span class="text-teal-600 text-xs p-1"></span></a><a class="my-3 block" href="/#">contact@company.com
                <span class="text-teal-600 text-xs p-1"></span></a>
        </div>
    </div>
</div>

<div class="bg-gray-100 pt-2">
    <div class="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center">
        <div class="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="/#" class="w-6 mx-1">
           
            </a>
            <a href="/#" class="w-6 mx-1">
            
            </a>
            <a href="/#" class="w-6 mx-1">
             
            </a>
            <a href="/#" class="w-6 mx-1">
                
            </a>
            <a href="/#" class="w-6 mx-1">
               
            </a>
        </div>
        <div class="my-5">© Copyright 2020. All Rights Reserved.</div>
    </div>
</div>
</>
  )
}

export default Footer

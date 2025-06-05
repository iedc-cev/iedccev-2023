"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { generateFromEmail } from "unique-username-generator";
import firebase from "firebase/compat/app";
import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserAuth } from "@/context/AuthContext";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Academic Information",
    fields: ["course", "passoutYear", "interests"],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: ["country", "state", "city", "street", "zip"],
  },
  { id: "Step 3", name: "Complete" },
];

export default function Form() {
  const router = useRouter();

  // const { user } = UserAuth()
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     await new Promise(resolve => setTimeout(resolve, 50))
  //     setLoading(false)
  //   }
  //   checkAuthentication()
  // }, [user])
  const user = auth.currentUser!;

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    console.log("User : " + user.displayName);
    console.log("User ID : " + user?.uid);
    // if (user) {
    //   const uid = user.uid;

    //   // db.collection("users")
    //   //   .doc(uid)
    //   //   .set({
    //   //     ...data,
    //   //   })
    //   //   .then(() => {
    //   //     console.log("Document successfully written!");
    //   //   });
    // } else {
    //   console.log("No user signed in");
    // }
    try {
      const docRef = doc(db, "users", user?.uid);
      await setDoc(docRef, {
        username: generateFromEmail(user.email!),
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL?.replaceAll("s96-c", "s400-c"),
        ...data,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    console.log(steps[currentStep].fields);
    console.log(output);
    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
        // add a time out then redirect from to main page
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="absolute inset-0 flex flex-col justify-between p-14 md:p-24 ">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Academic Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide your academic details.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="course"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course
                </label>
                <div className="mt-2">
                  {/* <input
                    type="text"
                    id="course"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  /> */}
                  <select
                    className="block px-3 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    {...register("course", { required: true })}
                  >
                    <option disabled selected className="font-bold">
                      Select your course
                    </option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics & Communication">
                      Electronics & Communication
                    </option>
                    <option value="Electrical and Electronics">
                      Electrical and Electronics
                    </option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>

                  {errors.course?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.course.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="passoutYear"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pass out Year
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="passoutYear"
                    {...register("passoutYear")}
                    className="block w-full px-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.passoutYear?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.passoutYear.message}
                    </p>
                  )}
                </div>
              </div>
              {user.phoneNumber === null ? (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="phoneNumber"
                      {...register("phoneNumber")}
                      className="block w-full px-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.phoneNumber?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <input
                  type="hidden"
                  value={user.phoneNumber}
                  {...register("phoneNumber")}
                />
              )}

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Fields of Interest
                </label>
                <div className="flex mt-1 flex-wrap">
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Iai"
                      {...register("interests.ai")}
                      content="Artificial Intelligence"
                    />
                    <label
                      htmlFor="Iai"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Artificial Intelligence
                    </label>
                  </div>
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Iweb"
                      {...register("interests.web")}
                      content="Web Development"
                      placeholder="Web Development"
                    />
                    <label
                      htmlFor="Iweb"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Web Development
                    </label>
                  </div>
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Iapp"
                      {...register("interests.app")}
                      content="App Development"
                      placeholder="App Development"
                    />
                    <label
                      htmlFor="Iapp"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      App Development
                    </label>
                  </div>
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Iml"
                      {...register("interests.ml")}
                      content="Machine Learning"
                      placeholder="Machine Learning"
                    />
                    <label
                      htmlFor="Iml"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Machine Learning
                    </label>
                  </div>
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Iblockchain"
                      {...register("interests.blockchain")}
                      content="Blockchain"
                      placeholder="Blockchain"
                    />
                    <label
                      htmlFor="Iblockchain"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Blockchain
                    </label>
                  </div>
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Idesign"
                      {...register("interests.design")}
                      content="Design"
                      placeholder="Design"
                    />
                    <label
                      htmlFor="Idesign"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Design
                    </label>
                  </div>
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Imanagement"
                      {...register("interests.management")}
                      content="Management"
                      placeholder="Management"
                    />
                    <label
                      htmlFor="Imanagement"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Management
                    </label>
                  </div>
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Iiot"
                      {...register("interests.iot")}
                      content="Internet of Things"
                      placeholder="Internet of Things"
                    />
                    <label
                      htmlFor="Iiot"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Internet of Things
                    </label>
                  </div>
                  <div className="flex m-2 gap-2">
                    <input
                      type="checkbox"
                      id="Icloud"
                      {...register("interests.cloud")}
                      content="Cloud Computing"
                      placeholder="Cloud Computing"
                    />
                    <label
                      htmlFor="Icloud"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Cloud Computing
                    </label>
                  </div>
                  {/* <div className="flex m-2 gap-2">
                    <label
                      htmlFor="other"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Other
                    </label>
                    <input
                      type="text"
                      id="other"
                      {...register("interests.other")}
                      content="Other"
                      placeholder="Other"
                    />
                  </div> */}
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Other
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="Iother"
                      {...register("interests.other")}
                      className="block w-full px-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {errors.interests?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.interests.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country")}
                    autoComplete="country-name"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  {errors.country?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="street"
                    {...register("street")}
                    autoComplete="street-address"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.street?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    autoComplete="address-level2"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.city?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="state"
                    {...register("state")}
                    autoComplete="address-level1"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.state?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="zip"
                    {...register("zip")}
                    autoComplete="postal-code"
                    className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.zip?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="py-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

{
  /* <Select {...register("course")}>
                    <SelectTrigger className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
                      <SelectValue
                        {...register("course")}
                        placeholder="Select a Course"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Course</SelectLabel>
                        <SelectItem value="Computer Science">
                          Computer Science
                        </SelectItem>
                        <SelectItem value="Electronics & Communication">
                          Electronics & Communication
                        </SelectItem>
                        <SelectItem value="Electrical and Electronics">
                          Electrical and Electronics
                        </SelectItem>
                        <SelectItem value="Information Technology">
                          Information Technology
                        </SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select> */
}

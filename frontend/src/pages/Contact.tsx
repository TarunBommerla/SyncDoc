import Footer from "../Components/layout/Footer";
import Navbar from "../Components/layout/Navbar";

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-600">
                Contact SyncDoc
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                We'd love to hear from you.
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-500">
                Have a question, feedback, or need help with SyncDoc? Send us a
                message and we'll get back to you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="lg:pt-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Get in touch
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                  Let's talk.
                </h2>

                <p className="mt-5 max-w-lg leading-7 text-gray-500">
                  Whether you have a question about SyncDoc, want to share
                  feedback, or need assistance, we're here to help.
                </p>

                {/* Info Cards */}
                <div className="mt-10 space-y-6">
                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                      @
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>

                      <p className="mt-1 text-sm text-gray-500">
                        support@syncdoc.com
                      </p>
                    </div>
                  </div>

                  {/* Response */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                      ↗
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Response Time
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        We usually respond within 1–2 business days.
                      </p>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                      ✓
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">Feedback</h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Your feedback helps us improve SyncDoc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <form className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      placeholder="How can we help?"
                      rows={5}
                      required
                      className="mt-2 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.99]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Looking for your documents?
            </h2>

            <p className="mt-3 text-gray-500">
              Head over to your SyncDoc workspace to manage your documents.
            </p>

            <a
              href="/documents"
              className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              View Documents
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

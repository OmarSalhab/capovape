export default function LocationSection() {
    // Replace the src in iframe with your Google Maps embed URL or use place_id + API if preferred
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.1234567890123!2d-79.3832!3d43.6532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0000000000000000!2sCapoVape!5e0!3m2!1sen!2sca!4v0000000000000";

    return (
        <section id="location" className="py-12 md:py-20 bg-[#070707]">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl uppercase md:text-3xl font-mafia text-center text-[#C5A66A] tracking-widest mb-6">Where to find CapoVape</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="order-2 md:order-1">
                            <div className="bg-gradient-to-b from-[#070707] to-[#0b0b0b] border border-neutral-800/40 rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    title="CapoVape - Toronto"
                                    src={mapSrc}
                                    width="100%"
                                    height="360"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="order-1 md:order-2 flex flex-col gap-4">
                            <div className="p-4 bg-black/30 border border-neutral-800 rounded-lg">
                                <div className="text-sm text-neutral-300">Address</div>
                                <div className="font-semibold text-white text-lg">CapoVape</div>
                                <div className="text-neutral-300">123 King St W, Toronto, ON</div>
                            </div>

                            <div className="p-4 bg-black/30 border border-neutral-800 rounded-lg">
                                <div className="text-sm text-neutral-300">Hours</div>
                                <div className="text-neutral-300">Mon–Fri: 10:00 — 19:00</div>
                                <div className="text-neutral-300">Sat: 11:00 — 18:00</div>
                                <div className="text-neutral-300">Sun: Closed</div>
                            </div>

                            <div className="p-4 bg-black/30 border border-neutral-800 rounded-lg">
                                <div className="text-sm text-neutral-300">Contact</div>
                                <div className="text-neutral-300">Phone: (416) 555‑0100</div>
                                <div className="text-neutral-300">Email: hello@capovape.ca</div>
                            </div>

                    
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

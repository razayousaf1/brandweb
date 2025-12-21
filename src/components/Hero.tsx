import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="hero-gradient min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Where Royalty<br />
              <span className="text-accent">Meets</span><br />
              Refinement
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl">
              Discover our exquisite collection of premium men's jewelry, crafted for the modern gentleman who appreciates luxury and sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="btn-primary text-primary-foreground px-8 py-4 text-lg font-semibold"
                onClick={() => router.push('/rings')}
                data-testid="button-explore-collection"
              >
                Explore Collection
              </Button>
              <Button
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 text-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-all"
                onClick={() => router.push('/about')}
                data-testid="button-our-story"
              >
                Our Story
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
              alt="Luxury men's jewelry collection"
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="img-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

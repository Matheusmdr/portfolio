import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent } from "../ui/carousel";
import { AbilitieItem } from "./components/AbilitieItem";
import { api } from "@/utils/api";

export function AbilitesList() {
  const { data: abilities } = api.abilitie.getAll.useQuery();

  return (
    <div className="mx-auto flex w-full justify-center gap-4 md:max-w-screen-xl">
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[
          AutoScroll({
            playOnInit: true,
            speed: 0.5,
          }),
        ]}
        className="max-w-screen-sm w-10/12"
      >
        <CarouselContent>
          {abilities?.map(
            (abilitie) =>
              abilitie?.pictureUrl?.trim() && (
                <AbilitieItem key={abilitie.id} abilitie={abilitie} />
              ),
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

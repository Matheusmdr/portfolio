import { type GetServerSideProps } from "next";
import { Layout } from "@/components/Admin/Layout";
import { helpers } from "@/server/helpers/ssgHelper";
import { api } from "@/utils/api";
import { CreateAndEditAbilitie } from "@/components/Admin/Forms";

interface EditProps {
  id: string;
}

export default function Edit({ id }: EditProps) {
  const { data } = api.abilitie.get.useQuery({ id });
  console.log(data)
  return (
    <Layout>
      <CreateAndEditAbilitie data={data} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");
  await helpers.abilitie.get.prefetch({ id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

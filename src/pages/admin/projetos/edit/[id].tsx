import { type GetServerSideProps } from "next";
import { CreateAndEditProject } from "@/components/Admin/Forms";
import { Layout } from "@/components/Admin/Layout";
import { helpers } from "@/server/helpers/ssgHelper";
import { api } from "@/utils/api";

interface EditProps {
  id: string;
}

export default function Edit({ id }: EditProps) {
  const { data } = api.project.get.useQuery({ id });
  return (
    <Layout>
      <CreateAndEditProject data={data} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");
  await helpers.project.get.prefetch({ id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";

//internal import

import useAsync from "hooks/useAsync";
import { SidebarContext } from "context/SidebarContext";
import PressServices from "services/PressServices";
import useToggleDrawer from "hooks/useToggleDrawer";
import useFilter from "hooks/useFilter";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import PageTitle from "components/Typography/PageTitle";
import MainDrawer from "components/drawer/MainDrawer";
import PressDrawer from "components/drawer/PressDrawer";
import TableLoading from "components/preloader/TableLoading";
import PressTable from "components/press/PressTable";
import NotFound from "components/table/NotFound";

const Press = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);

  const { data, loading } = useAsync(PressServices.getAllPress);

  const { allId, serviceId } = useToggleDrawer();

  const {
    handleSubmitCategory,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,

    searchRef,
  } = useFilter(data ? data.data : []);

  // react hooks
  const [isCheck, setIsCheck] = useState([]);
  const [showChild, setShowChild] = useState(false);

  return (
    <>
      <PageTitle>{"Press"}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} />

      <BulkActionDrawer
        ids={allId}
        title="Presses"
        lang={lang}
        data={data}
        isCheck={isCheck}
      />

      <MainDrawer>
        <PressDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitCategory}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder={"Search Press"}
              />
            </div>
            <div className="w-full md:w-48 lg:w-48 xl:w-48">
              <Button onClick={toggleDrawer} className="rounded-md h-12 w-full">
                <span className="mr-2">
                  <FiPlus />
                </span>
                {"Add Press"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"ID"}</TableCell>
                <TableCell>{"Image"}</TableCell>
                <TableCell>{"Title"}</TableCell>
                <TableCell>{"Source"}</TableCell>

                <TableCell className="text-center">{"Published"}</TableCell>
                <TableCell className="text-right">{"Actions"}</TableCell>
              </tr>
            </TableHeader>

            <PressTable
              data={data.data}
              lang={lang}
              isCheck={isCheck}
              presses={dataTable}
              setIsCheck={setIsCheck}
              showChild={showChild}
            />
          </Table>

          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no press releases right now." />
      )}
    </>
  );
};

export default Press;

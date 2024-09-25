import React, { useState } from "react";
import { Transition } from "react-transition-group";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { Box, FormControl, FormLabel, Input, Option, Select } from "@mui/joy";
import toast from "react-hot-toast";
import { createNft } from "../../../service/nft";
import { useDispatch } from "react-redux";
import { getNftData } from "../../../redux/features/nftsSlice";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCreatorData } from "../../../redux/features/creatorsSlice";

export function ProductActionModal() {
  const [open, setOpen] = useState(false);
  const { items: creators } = useSelector(selectCreatorData);
  const [name, setName] = useState("");
  const [priceCurrency, setPriceCurrency] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchStrParams = searchParams.get("searchStr") || "";
  const sortParams = searchParams.get("sort") || "";
  const creatorsParams = searchParams.get("creators") || "";

  async function handleSave() {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("priceCurrency", priceCurrency);
    formData.append("priceValue", priceValue);
    formData.append("creatorId", creatorId);
    formData.append("image", image);

    const resultPromise = createNft(formData);

    toast.promise(resultPromise, {
      loading: "Creating product...",
      success: "Product created successfully",
      error: "Failed to create product",
    });

    const result = await resultPromise;
    if (result.status === 201) {
      setOpen(false);
      dispatch(
        getNftData({
          creators: creatorsParams,
          sort: sortParams,
          searchStr: searchStrParams,
        })
      );
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Create Product
      </Button>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={[
              state === "exited"
                ? { visibility: "hidden" }
                : { visibility: "visible" },
            ]}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                width: "400px",
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <DialogTitle>Product Action</DialogTitle>
              <DialogContent
                sx={{ p: 1, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Type here..."
                  />
                </FormControl>
                <Box sx={{ display: "flex", gap: 2.5 }}>
                  <FormControl>
                    <FormLabel>Currency</FormLabel>
                    <Input
                      value={priceCurrency}
                      onChange={(e) => {
                        setPriceCurrency(e.target.value);
                      }}
                      sx={{ width: 120 }}
                      placeholder="AZN"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <Input
                      value={priceValue}
                      onChange={(e) => {
                        setPriceValue(e.target.value);
                      }}
                      type="number"
                      placeholder="Type here..."
                    />
                  </FormControl>
                </Box>
                <FormControl>
                  <FormLabel>Creator</FormLabel>
                  <Select
                    value={creatorId}
                    onChange={(_, value) => {
                      setCreatorId(value);
                    }}
                  >
                    {creators.map((creator) => (
                      <Option key={creator.id} value={creator.id}>
                        {creator.name}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    slotProps={{
                      input: {
                        type: "file",
                        accept: ".png, .jpg, .jpeg",
                      },
                    }}
                    placeholder="Type here..."
                  />
                </FormControl>
                <Button
                  disabled={loading}
                  onClick={handleSave}
                  variant="solid"
                  color="primary"
                >
                  Save
                </Button>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../helpers/Fetch";
import { GetData } from "../Action/GetData";

const initialState = {
  url: "http://localhost:3001/home",
  urlDogs: "http://localhost:3001/Dogs",
  AllData: { Data: [], filterData: [] },
  filters: {
    name: "",
    minWeight: "",
    maxWeight: "",
    temperament: "",
  },
  filterSearch: false, // esto se usa para que cuando carguen las paginas podamos ejecutar un alert diciendo si no se encontro un objeto con los filtros, esto dependiendo si antes se uso los filtros
  error: {},
  loader: false,
  MaxPage: undefined,
};

let dataReducer = createSlice({
  name: "data",
  initialState,
  reducers: {
    filter: (state, action) => {
      state.filters = action.payload.filters;
      state.filterSearch = action.payload.search;
    },
    clearFilters: (state, action) => {
      state.AllData.filterData = state.AllData.Data;
    },
    filterData: (state, action) => {
      let newArray = [];
      state.AllData.filterData.forEach((el) => {
        let filter = { active: 0, found: 0 };
        if (state.filters?.name) {
          filter.active++;
          if (el.name.toLowerCase().includes(state.filters.name.toLowerCase())) {
            filter.found++;
          }
        }
        if (state.filters.minWeight && state.filters.maxWeight) {
          let minWeight = state.filters.minWeight,
            maxWeight = state.filters.maxWeight;
          filter.active++;
          if (el.weight.minWeight >= minWeight && el.weight.maxWeight <= maxWeight) {
            filter.found++;
          }
        }
        if (state.filters.temperament) {
          filter.active++;
          if (
            el?.temperament
              .toLowerCase()
              .includes(state.filters.temperament.toLowerCase())
          ) {
            filter.found++;
          }
        }
        if (filter.found === filter.active && filter.active > 0 && filter.found > 0) {
          newArray.push(el);
        }
      });
      if (newArray.length > 0) {
        state.AllData.filterData = newArray;
      } else {
        state.AllData.filterData = state.AllData.Data;
        state.filters = initialState.filters;
        alert("No se ha encontrado el elemento");
      }
    },
    OderBymax: (state, action) => {
      state.AllData.filterData.sort((a, b) => b.weight.maxWeight - a.weight.maxWeight);
    },
    OderBymin: (state, action) => {
      state.AllData.filterData.sort((a, b) => a.weight.minWeight - b.weight.minWeight);
    },
    OrderByAZ: (state) => {
      state.AllData.filterData.sort((a, b) => a.name.localeCompare(b.name));
    },
    OrderByZA: (state) => {
      state.AllData.filterData.sort((a, b) => b.name.localeCompare(a.name));
    },
    clearState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetData.fulfilled, (state, action) => {
        let data = action.payload?.success
          ? [...action.payload.returnData]
          : action.payload.success;

        if (data) {
          let newArray = [];
          data.forEach((el) => {
            let filter = { active: 0, found: 0 };
            if (state.filters?.name) {
              filter.active++;
              if (el.name.toLowerCase().includes(state.filters.name.toLowerCase())) {
                filter.found++;
              }
            }
            if (state.filters.minWeight && state.filters.maxWeight) {
              let minWeight = state.filters.minWeight,
                maxWeight = state.filters.maxWeight;
              filter.active++;
              if (el.weight.minWeight >= minWeight && el.weight.maxWeight <= maxWeight) {
                filter.found++;
              }
            }
            if (state.filters.temperament) {
              filter.active++;
              if (
                el.temperament
                  .toLowerCase()
                  .includes(state.filters.temperament.toLowerCase())
              ) {
                filter.found++;
              }
            }
            if (filter.found === filter.active && filter.active > 0 && filter.found > 0) {
              newArray.push(el);
            }
          });
          if (newArray.length <= 0 && state.filterSearch) {
            alert("no se han encontrado datos");
          }
          state.AllData.Data = data;
          state.AllData.filterData = newArray.length > 0 ? newArray : data;
          state.loader = true;
          state.MaxPage = action.payload.MaxPage;
        } else {
          state.loader = true;
        }
      })
      .addCase(GetData.pending, (state, action) => {
        state.loader = false;
      })
      .addCase(GetData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const {
  filter,
  filterData,
  OderBymax,
  OderBymin,
  clearFilters,
  clearState,
  OrderByAZ,
  OrderByZA,
} = dataReducer.actions;
export default dataReducer.reducer;

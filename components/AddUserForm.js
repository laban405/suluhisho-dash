import { makeStyles } from "@material-ui/core/styles";
import SuTextField from "./Inputs/SuTextField";
import SuFormControl from "./Inputs/SuFormControl";
import SuGrid from "./Layout/SuGrid";
import SuInputLabel from "./Inputs/SuInputLabel";
import SuMenuItem from "./Navigation/SuMenuItem";
import SuSelect from "./Inputs/SuSelect";
import Button from "./CustomButtons/Button";

const counties = [
  { value: "Baringo", label: "Baringo" },
  { value: "Bomet", label: "Bomet" },
  { value: "Bungoma", label: "Bungoma" },
  { value: "Busia", label: "Busia" },
  { value: "Elgeyo-Marakwet", label: "Elgeyo-Marakwet" },
  { value: "Embu", label: "Embu" },
  { value: "Garissa", label: "Garissa" },
  { value: "Homa Bay", label: "Homa Bay" },
  { value: "Isiolo", label: "Isiolo" },
  { value: "Kajiado", label: "Kajiado" },
  { value: "Kakamega", label: "Kakamega" },
  { value: "Kericho", label: "Kericho" },
  { value: "Kiambu", label: "Kiambu" },
  { value: "Kilifi", label: "Kilifi" },
  { value: "Kirinyaga", label: "Kirinyaga" },
  { value: "Kisii", label: "Kisii" },
  { value: "Kisumu", label: "Kisumu" },
  { value: "Kitui", label: "Kitui" },
  { value: "Kwale", label: "Kwale" },
  { value: "Laikipia", label: "Laikipia" },
  { value: "Lamu", label: "Lamu" },
  { value: "Machakos", label: "Machakos" },
  { value: "Makueni", label: "Makueni" },
  { value: "Mandera", label: "Mandera" },
  { value: "Marsabit", label: "Marsabit" },
  { value: "Meru", label: "Meru" },
  { value: "Migori", label: "Migori" },
  { value: "Mombasa", label: "Mombasa" },
  { value: "Muranga", label: "Muranga" },
  { value: "Nairobi", label: "Nairobi" },
  { value: "Nakuru", label: "Nakuru" },
  { value: "Nandi", label: "Nandi" },
  { value: "Narok", label: "Narok" },
  { value: "Nyamira", label: "Nyamira" },
  { value: "Nyandarua", label: "Nyandarua" },
  { value: "Nyeri", label: "Nyeri" },
  { value: "Samburu", label: "Samburu" },
  { value: "Siaya", label: "Siaya" },
  { value: "Taita-Taveta", label: "Taita-Taveta" },
  { value: "Tana River", label: "Tana River" },
  { value: "Tharaka-Nithi", label: "Tharaka-Nithi" },
];

const subCounties = [
  { value: "Baringo Central", label: "Baringo Central" },
  { value: "Baringo North", label: "Baringo North" },
  { value: "Baringo South", label: "Baringo South" },
  { value: "Eldama Ravine", label: "Eldama Ravine" },
  { value: "Mogotio", label: "Mogotio" },
  { value: "Tiaty", label: "Tiaty" },
  { value: "Bomet Central", label: "Bomet Central" },
  { value: "Bomet East", label: "Bomet East" },
  { value: "Bomet West", label: "Bomet West" },
  { value: "Chepalungu", label: "Chepalungu" },
  { value: "Konoin", label: "Konoin" },
  { value: "Sotik", label: "Sotik" },
  { value: "Bumula", label: "Bumula" },
  { value: "Butula", label: "Butula" },
  { value: "Kabuchai", label: "Kabuchai" },
  { value: "Kanduyi", label: "Kanduyi" },
  { value: "Kimilili", label: "Kimilili" },
  { value: "Webuye East", label: "Webuye East" },
  { value: "Webuye West", label: "Webuye West" },
  { value: "Budalangi", label: "Budalangi" },
];

const categories = [
  { value: "category-a", label: "Category A" },
  { value: "category-b", label: "Category B" },
  { value: "category-c", label: "Category C" },
  { value: "category-d", label: "Category D" },
  { value: "category-e", label: "Category E" },
  { value: "category-f", label: "Category F" },
];

const useStyles = makeStyles({
  formControl: {
    width: "100%",
  },
});

function AddUserForm({ formik, onChangeUpload }) {
  const classes = useStyles();

  return (
    <form onSubmit={formik.handleSubmit}>
      <SuGrid container spacing={3}>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            fullWidth
            label="First name"
            id="firstname"
            name="firstname"
            onChange={formik.handleChange}
            required
            value={formik.values.firstname}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            fullWidth
            label="Last name"
            id="lastname"
            name="lastname"
            onChange={formik.handleChange}
            required
            value={formik.values.lastname}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            fullWidth
            label="Email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            required
            value={formik.values.email}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            fullWidth
            label="Phone"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            required
            value={formik.values.phone}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuFormControl fullWidth className={classes.formControl}>
            <SuInputLabel id="county-select-label">County</SuInputLabel>
            <SuSelect
              labelId="county-select-label"
              label="County"
              id="county"
              name="county"
              onChange={formik.handleChange}
              value={formik.values.county}
              variant="outlined"
            >
              {counties.map((county) => (
                <SuMenuItem key={county.value} value={county.value}>
                  {county.label}
                </SuMenuItem>
              ))}
            </SuSelect>
          </SuFormControl>
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuFormControl fullWidth className={classes.formControl}>
            <SuInputLabel id="sub-county-select-label">Sub County</SuInputLabel>
            <SuSelect
              labelId="sub-county-select-label"
              label="Sub County"
              id="subCounty"
              name="subCounty"
              onChange={formik.handleChange}
              value={formik.values.subCounty}
              variant="outlined"
            >
              {subCounties.map((subCounty) => (
                <SuMenuItem key={subCounty.value} value={subCounty.value}>
                  {subCounty.label}
                </SuMenuItem>
              ))}
            </SuSelect>
          </SuFormControl>
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <SuFormControl fullWidth className={classes.formControl}>
            <SuInputLabel id="category-select-label">Category</SuInputLabel>
            <SuSelect
              labelId="category-select-label"
              label="Category"
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              variant="outlined"
            >
              {categories.map((category) => (
                <SuMenuItem key={category.value} value={category.value}>
                  {category.label}
                </SuMenuItem>
              ))}
            </SuSelect>
          </SuFormControl>
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            fullWidth
            label="National ID"
            id="nationalID"
            name="nationalID"
            onChange={formik.handleChange}
            required
            value={formik.values.nationalID}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            fullWidth
            label="Profession"
            id="profession"
            name="profession"
            onChange={formik.handleChange}
            required
            value={formik.values.profession}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            fullWidth
            label="Latitude"
            id="latitude"
            name="latitude"
            onChange={formik.handleChange}
            required
            value={formik.values.latitude}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            fullWidth
            label="Longitude"
            id="longitude"
            name="longitude"
            onChange={formik.handleChange}
            required
            value={formik.values.longitude}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <SuTextField
            fullWidth
            label="Location"
            id="location"
            name="location"
            onChange={formik.handleChange}
            required
            value={formik.values.location}
            variant="outlined"
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <label>
            Choose profile picture
            <input type="file" id="file" onChange={onChangeUpload} />
          </label>
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <Button fullWidth type="submit" color="primary">
            Create Service Provider
          </Button>
        </SuGrid>
      </SuGrid>
    </form>
  );
}

export default AddUserForm;

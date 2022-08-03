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
  { value: "counselling", label: "Counselling" },
  { value: "hospital", label: "Hospital" },
  { value: "legal", label: "Legal" },
  { value: "police", label: "Police" },
  { value: "shelter", label: "Shelter" },
  { value: "socialwork", label: "Social Work" },
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
            required
            fullWidth
            label="First name"
            id="firstname"
            name="firstname"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            variant="outlined"
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Last name"
            id="lastname"
            name="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            variant="outlined"
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            variant="outlined"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Phone"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            variant="outlined"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuFormControl fullWidth className={classes.formControl}>
            <SuInputLabel id="county-select-label">County</SuInputLabel>
            <SuSelect
              required
              labelId="county-select-label"
              label="County"
              id="county"
              name="county"
              onChange={formik.handleChange}
              value={formik.values.county}
              variant="outlined"
              error={formik.touched.county && Boolean(formik.errors.county)}
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
              required
              labelId="sub-county-select-label"
              label="Sub County"
              id="subCounty"
              name="subCounty"
              onChange={formik.handleChange}
              value={formik.values.subCounty}
              variant="outlined"
              error={
                formik.touched.subCounty && Boolean(formik.errors.subCounty)
              }
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
              required
              labelId="category-select-label"
              label="Category"
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              variant="outlined"
              error={formik.touched.category && Boolean(formik.errors.category)}
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
            required
            fullWidth
            label="National ID"
            id="nationalID"
            name="nationalID"
            onChange={formik.handleChange}
            value={formik.values.nationalID}
            variant="outlined"
            error={
              formik.touched.nationalID && Boolean(formik.errors.nationalID)
            }
            helperText={formik.touched.nationalID && formik.errors.nationalID}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Profession"
            id="profession"
            name="profession"
            onChange={formik.handleChange}
            value={formik.values.profession}
            variant="outlined"
            error={
              formik.touched.profession && Boolean(formik.errors.profession)
            }
            helperText={formik.touched.profession && formik.errors.profession}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Latitude"
            id="latitude"
            name="latitude"
            onChange={formik.handleChange}
            value={formik.values.latitude}
            variant="outlined"
            error={formik.touched.latitude && Boolean(formik.errors.latitude)}
            helperText={formik.touched.latitude && formik.errors.latitude}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Longitude"
            id="longitude"
            name="longitude"
            onChange={formik.handleChange}
            value={formik.values.longitude}
            variant="outlined"
            error={formik.touched.longitude && Boolean(formik.errors.longitude)}
            helperText={formik.touched.longitude && formik.errors.longitude}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <SuTextField
            required
            fullWidth
            label="Location"
            id="location"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            variant="outlined"
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
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
            Submit
          </Button>
        </SuGrid>
      </SuGrid>
    </form>
  );
}

export default AddUserForm;
